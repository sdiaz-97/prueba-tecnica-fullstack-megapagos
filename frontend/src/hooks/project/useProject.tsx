'use client';

import { useEffect, useState } from "react";
import { apiService } from "../../../utils/apiService";
import { API_ROUTES } from "../../../utils/apiRoutes";
import { responseDto } from "@/interfaces/requests.dto";
import toast from "react-hot-toast";

export const useProjects = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers]: any = useState();
    const [formData, setFormData] = useState({ id: null, name: "", description: "", assignedUsers: [] });
    const [roleId, setRoleId] = useState(null);
    const [loadingRoleId, setLoadingRoleId] = useState(true);
    const [userSelect, setUserSelect] = useState([]);

    const columns = [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        { key: "createdAt", label: "Fecha de creación" },
        ...(roleId === 1 ? [{ key: "assignedUsers", label: "Usuarios Asignados" }] : []),
        { key: "admin", label: "Administrador del proyecto" },
    ];

    useEffect(() => {
        try {
            const cookie = document.cookie
                .split("; ")
                .find(c => c.startsWith("userInfo="))
                ?.split("=")[1];

            if (cookie) {
                const parsedUserInfo = JSON.parse(decodeURIComponent(cookie));
                setRoleId(parsedUserInfo.roleId);
            }
        } catch (error) {
            console.error("Error parsing userInfo cookie:", error);
        } finally {
            setLoadingRoleId(false);
        }
    }, []);



    useEffect(() => {
        if (!loadingRoleId) {
            fetchProjects();
            if (roleId === 1) {
                fetchUsers();
            }
        }
    }, [page, query, loadingRoleId]);

    const fetchProjects = async () => {
        try {
            const response: responseDto = await apiService.get(`${API_ROUTES.projects}?limit=5&page=${page}&search=${query}`);
            if (response.status === 200) {
                setProjects(
                    (response.data.projects ?? []).map((project: any) => ({
                        ...project,
                        assignedUsers:
                            roleId === 1
                                ? project.assignedUsers.map((userObj: any) => userObj.user.name).join(", ")
                                : [],
                        admin: project.admin.name,
                        assignedUsersids:
                            roleId === 1
                                ? project.assignedUsers.map((userObj: any) => userObj.user.id)
                                : [],
                    }))
                );
                setTotalPages(Math.ceil(response.data.total / 5));
            }
        } catch (error) {
            console.error("Error al obtener proyectos:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response: responseDto = await apiService.get(`${API_ROUTES.users}?limit=50`);
            if (response.status === 200) {
                setUsers(response.data.users.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                })));
                setUserSelect(response.data.users.map((user: any) => ({
                    value: user.id,
                    label: user.name,
                })))
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleSearch = () => {
        setQuery(search);
        setPage(1);
    };

    const handleOpenModal = (project: any = null) => {

        if (project) {
            setFormData({
                id: project.id,
                name: project.name,
                description: project.description,
                assignedUsers: project.assignedUsersids
            });
            setSelectedUsers(project.assignedUsersids);
        } else {
            setFormData({ id: null, name: "", description: "", assignedUsers: [] });
            setSelectedUsers([]);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchProjects();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const payload = { ...formData, assignedUsers: selectedUsers };
            let response: responseDto;
            if (formData.id) {
                response = await apiService.put(`${API_ROUTES.projects}?id=${formData.id}`, payload);
            } else {
                response = await apiService.post(API_ROUTES.projects, payload);
            }
            if (response.status === 201 || response.status === 200) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error al agregar o actualizar el proyecto:", error);
        }
    };

    const handleDelete = async (project: any = null) => {
        toast((t) => (
            <div className="text-center">
                <p className="font-semibold">¿Estás seguro de que deseas eliminar el proyecto {project.name}?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const response: responseDto = await apiService.delete(`${API_ROUTES.projects}?id=${project.id}`);
                                if (response.status === 200) {
                                    fetchProjects();
                                    toast.success(response.message)
                                } else {
                                    toast.error(response.message)
                                }
                            } catch (error) {
                                toast.error("Error al eliminar el proyecto");
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

    return {
        projects, page, setPage, search, totalPages, setSearch, isModalOpen, columns,
        handleSearch, handleOpenModal, handleCloseModal, handleSubmit, formData, setFormData,
        users, selectedUsers, setSelectedUsers, roleId, handleDelete, userSelect
    };
};
