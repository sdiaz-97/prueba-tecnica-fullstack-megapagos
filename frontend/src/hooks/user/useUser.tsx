'use client';
import { useEffect, useState } from "react";
import { apiService } from "../../../utils/apiService";
import { API_ROUTES } from "../../../utils/apiRoutes";
import { responseDto } from "@/interfaces/requests.dto";
import toast from "react-hot-toast";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser]: any = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleId: "Usuario"
    });

    const columns = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Correo" },
        { key: "role", label: "Rol" },
        { key: "administrador", label: "Usuario Administrador" },
    ];

    useEffect(() => {
        fetchUsers();
    }, [page, query]);

    const fetchUsers = async () => {
        try {
            const response: responseDto = await apiService.get(`${API_ROUTES.users}?limit=5&page=${page}&search=${query}`);
            if (response.status === 200) {
                setUsers(response.data.users.map((user: any) => ({
                    ...user,
                    role: user.role?.name || "Sin rol",
                    administrador: user.administrador?.name || "Sin administrador",
                })));
                setTotalPages(Math.ceil(response.data.total / 5));
            } else {
                console.error("Error al obtener los usuarios");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleSearch = () => {
        setQuery(search);
        setPage(1);
    };

    const handleOpenModal = (user: any = null) => {
        setEditingUser(user);
        setFormData(user ?
            { name: user.name, email: user.email, password: "", confirmPassword: "", roleId: user.role }
            : { name: "", email: "", password: "", confirmPassword: "", roleId: "Usuario" }
        );
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        fetchUsers();
    };

    const handleDelete = async (user: any = null) => {
        toast((t) => (
            <div className="text-center">
                <p className="font-semibold">¿Estás seguro de que deseas eliminar a {user.name}?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const response: responseDto = await apiService.delete(`${API_ROUTES.users}?id=${user.id}`);
                                if (response.status === 200) {
                                    fetchUsers();
                                    toast.success(response.message)
                                } else {
                                    toast.error(response.message)
                                }
                            } catch (error) {
                                toast.error("Error al eliminar el usuario");
                            }
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            const dataLocalStorage: any = localStorage.getItem("user")
            const storedUser = JSON.parse(dataLocalStorage);
            let response: responseDto;
            if (editingUser) {
                response = await apiService.put(`${API_ROUTES.users}?id=${editingUser.id}`, { ...formData, administradorId: storedUser.userData.id });
            } else {
                response = await apiService.post(API_ROUTES.users, { ...formData, administradorId: storedUser.userData.id });
            }

            if (editingUser ? response.status === 200 : response.status === 201) {
                toast.success(response.message)
                handleCloseModal();
            } else {
                toast.error(response.message)
            }

        } catch (error) {
            toast.error("Error al guardar el usuario:")
        }
    };

    const handlePasswordChange = (e: any) => {
        const password = e.target.value;
        setFormData({ ...formData, password });

        if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: any) => {
        const confirmPassword = e.target.value;
        setFormData({ ...formData, confirmPassword });

        if (confirmPassword !== formData.password) {
            setConfirmPasswordError('Las contraseñas no coinciden.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const validateForm = (e: any) => {
        e.preventDefault();

        if (!editingUser) {
            if (formData.password.length < 8) {
                setPasswordError('La contraseña debe tener al menos 8 caracteres.');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setConfirmPasswordError('Las contraseñas no coinciden.');
                return;
            }
        }

        handleSubmit(e);
    };

    return {
        users, page, setPage, search, totalPages, setSearch,
        isModalOpen, editingUser, formData, setFormData,
        columns, handleSearch, handleOpenModal, handleCloseModal, handleDelete,
        showPassword,
        setShowPassword, confirmPasswordError, handlePasswordChange, validateForm, handleConfirmPasswordChange, passwordError
    };
};
