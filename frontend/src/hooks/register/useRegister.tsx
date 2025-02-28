'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../../utils/apiService";
import { API_ROUTES } from "../../../utils/apiRoutes";
import { responseDto } from "@/interfaces/requests.dto";
import toast from "react-hot-toast";

export const useRegister = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (pass: string, confirmPass: string) => {
        if (pass.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
        } else if (confirmPass && pass !== confirmPass) {
            setError("Las contraseñas no coinciden.");
        } else {
            setError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        validatePassword(password, newConfirmPassword);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (error) return;
        setLoading(true);
        try {
            const response: responseDto = await apiService.post(API_ROUTES.users, {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                toast.success(response.message);
                router.push("/login");
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error("Hubo un problema en el servidor. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const goToLogin = () => {
        router.push("/login");
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return {
        name, setName, email, setEmail, password, confirmPassword,
        setConfirmPassword, showPassword, error, loading,
        goToLogin, handleSubmit, handlePasswordChange, handleConfirmPasswordChange, toggleShowPassword
    };
};
