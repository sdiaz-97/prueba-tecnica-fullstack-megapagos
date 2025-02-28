'use client';
import { ProjectModalProps } from "@/interfaces/project.dto";
import Select from "react-select";

function ProjectModal({ handleCloseModal, formData, handleSubmit, setFormData, userOptions, selectedUsers, setSelectedUsers }: ProjectModalProps) {

    return (
        (
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg w-96">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-bold mb-4 text-center">
                            {formData.id ? "Editar Proyecto" : "Agregar Proyecto"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                            <textarea
                                placeholder="Descripción"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            ></textarea>

                            <label className="block text-gray-700 font-semibold">
                                Usuarios Asignados
                            </label>
                            <Select
                                isMulti
                                options={userOptions}
                                className="w-full"
                                value={userOptions.filter((option: any) =>
                                    selectedUsers.includes(option.value)
                                )}
                                onChange={(selectedOptions) =>
                                    setSelectedUsers(selectedOptions.map((option: any) => option.value))
                                }
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>



            </>

        )
    )
}

export default ProjectModal
