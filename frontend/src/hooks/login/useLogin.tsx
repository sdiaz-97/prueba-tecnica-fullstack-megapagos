'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../../utils/apiService";
import { API_ROUTES } from "../../../utils/apiRoutes";
import { responseDto } from "@/interfaces/requests.dto";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onFinish = async (event: any) => {
        event.preventDefault();
        try {
            const response: responseDto = await apiService.post(API_ROUTES.auth.login, {
                email,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                router.push("/dashboard/project");
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            toast.error("Error en el envio de la petición")
        }
    }

    const goToRegister = () => {
        router.push("/register")
    }

    return { email, setEmail, password, setPassword, onFinish, showPassword, setShowPassword, goToRegister }
}