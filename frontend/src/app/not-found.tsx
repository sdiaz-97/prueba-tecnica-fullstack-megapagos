export default function NotFoundPage() {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-4xl font-bold">404 - Página No Encontrada</h1>
        <p className="text-gray-600 mt-2">La página que buscas no existe.</p>
        <a href="/login" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </a>
      </div>
    );
  }
  