'use client';

import { UserModalProps } from "@/interfaces/user.dto";

function UserModal({ editingUser, formData, setFormData, handleCloseModal, showPassword,
    setShowPassword, confirmPasswordError,
    handlePasswordChange, validateForm, handleConfirmPasswordChange, passwordError
}: UserModalProps) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg w-96">
                <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-lg font-bold mb-4 text-center">
                    {editingUser ? 'Editar Usuario' : 'Registrar Usuario'}
                </h2>

                <form onSubmit={validateForm} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        disabled={editingUser !== null}
                        placeholder="Correo"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {!editingUser && (
                        <>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '🙈'}
                                </button>
                                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirmar Contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '🙈'}
                                </button>
                                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                            </div>
                        </>
                    )}
                    <select
                        value={formData.roleId || 'Usuario'}
                        onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        {editingUser ? 'Guardar Cambios' : 'Registrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserModal;

