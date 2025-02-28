'use client';

import { useProjects } from "@/hooks/project/useProject";
import Table from "@/components/Table";
import ProjectModal from "./ProjectModal";


function ProjectsData() {
  const {
    projects,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    isModalOpen,
    columns,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    formData,
    setFormData,
    userSelect,
    selectedUsers,
    setSelectedUsers,
    roleId,
    handleDelete,
  } = useProjects();



  return (
    
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar proyecto..."
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
          {roleId === 1 && (
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Agregar Proyecto
            </button>
          )}



        </div>

      

      <Table
        columns={columns}
        data={projects}
        showActions={roleId === 1 ? true : false}
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
        <ProjectModal handleCloseModal={handleCloseModal} formData={formData} handleSubmit={handleSubmit} setFormData={setFormData} userOptions={userSelect} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
      )}
    </div>
  );
}

export default ProjectsData;