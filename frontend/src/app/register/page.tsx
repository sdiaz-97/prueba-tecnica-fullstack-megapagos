"use client";

import FormRegister from "./ui/FormRegister";

const RegisterPage = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Registrarse</h2>
        <FormRegister />
      </div>
    </div>
  );
};

export default RegisterPage;
