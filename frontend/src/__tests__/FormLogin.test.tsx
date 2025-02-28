import { render, screen, fireEvent } from "@testing-library/react";


import LoginPage from "@/app/login/page";
import { useLogin } from "@/hooks/login/useLogin";


jest.mock("@/hooks/login/useLogin", () => ({
  useLogin: jest.fn(),
}));

describe("FormLogin", () => {
  it("Vereficar que los input renderizan", () => {
    (useLogin as jest.Mock).mockReturnValue({
      email: "",
      password: "",
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      onFinish: jest.fn(),
      showPassword: false,
      setShowPassword: jest.fn(),
      goToRegister: jest.fn(),
    });

    render(<LoginPage />);

    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it("Asignarle los valores a los campos", () => {
    const mockSetEmail = jest.fn();
    const mockSetPassword = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      email: "",
      password: "",
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      onFinish: jest.fn(),
      showPassword: false,
      setShowPassword: jest.fn(),
      goToRegister: jest.fn(),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Correo/i), {
      target: { value: "juan@hotmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "password123" },
    });

    expect(mockSetEmail).toHaveBeenCalledWith("juan@hotmail.com");
    expect(mockSetPassword).toHaveBeenCalledWith("password123");
  });

  it("Vereficando el funcionanmiento del login", () => {
    const mockOnFinish = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      email: "juan@hotmail.com",
      password: "password123",
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      onFinish: mockOnFinish,
      showPassword: false,
      setShowPassword: jest.fn(),
      goToRegister: jest.fn(),
    });

    render(<LoginPage />);

    fireEvent.submit(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    expect(mockOnFinish).toHaveBeenCalled();
  });
});
