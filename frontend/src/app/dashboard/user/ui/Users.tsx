'use client';

import Table from "@/components/Table";
import { useUser } from "@/hooks/user/useUser";
import UserModal from "./UserModal";

function UserData() {
    const {
        users, page, setPage, search, totalPages, setSearch,
        isModalOpen, editingUser, formData, setFormData,
        columns, handleSearch, handleOpenModal, handleCloseModal, handleDelete,
        showPassword,
        setShowPassword, confirmPasswordError, handlePasswordChange, validateForm, handleConfirmPasswordChange, passwordError
    } = useUser();

    return (
        <div className="w-full max-w-screen-lg mx-auto">

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar Usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Buscar
                </button>

                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Agregar Usuario
                </button>




            </div>
            <Table
                columns={columns}
                data={users}
                showActions={true}
                showEdit={true}
                showDelete={true}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
            />

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>

            {isModalOpen && (
                <UserModal editingUser={editingUser} formData={formData}
                    setFormData={setFormData} handleCloseModal={handleCloseModal}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword} confirmPasswordError={confirmPasswordError}
                    handlePasswordChange={handlePasswordChange} validateForm={validateForm}
                    handleConfirmPasswordChange={handleConfirmPasswordChange}
                    passwordError={passwordError}
                />
            )}

        </div>
    );
}

export default UserData;
