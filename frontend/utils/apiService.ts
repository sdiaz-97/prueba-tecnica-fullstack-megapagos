import { RequestOptions } from "@/interfaces/requests.dto";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://ec2-44-220-161-148.compute-1.amazonaws.com:3000"
    : "http://localhost:3000";



const getToken = (): string | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).tokenjwt : null;
};

const request = async <T>(
  method: string,
  endpoint: string,
  data: any = null,
  headers: Record<string, string> = {}
): Promise<T> => {
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  headers["Content-Type"] = "application/json";

  const options: RequestOptions = {
    method,
    headers,
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (response.status === 401) {
      console.error("No autorizado. Redirigiendo al login...");
      window.location.href = "/login";
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${method} ${endpoint}:`, error);
    throw error;
  }
};

export const apiService = {
  get: <T>(endpoint: string, headers: Record<string, string> = {}) =>
    request<T>("GET", endpoint, null, headers),
  post: <T>(endpoint: string, data: any, headers: Record<string, string> = {}) =>
    request<T>("POST", endpoint, data, headers),
  put: <T>(endpoint: string, data: any, headers: Record<string, string> = {}) =>
    request<T>("PUT", endpoint, data, headers),
  delete: <T>(endpoint: string, headers: Record<string, string> = {}) =>
    request<T>("DELETE", endpoint, null, headers),
  patch: <T>(endpoint: string, data: any, headers: Record<string, string> = {}) =>
    request<T>("PATCH", endpoint, data, headers),
};