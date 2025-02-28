'use client';

import { useLogin } from "@/hooks/login/useLogin";

function FormLogin() {
    const { email, setEmail, setPassword, onFinish, password, showPassword, setShowPassword, goToRegister } = useLogin();

    return (
        <>
            <form className="space-y-4" onSubmit={onFinish}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingresa tu correo"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                            placeholder="Ingresa tu contraseña"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
                >
                    Iniciar Sesión
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
                <button
                    onClick={goToRegister}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                    Regístrate aquí
                </button>
            </div>
        </>
    );
}

export default FormLogin;
