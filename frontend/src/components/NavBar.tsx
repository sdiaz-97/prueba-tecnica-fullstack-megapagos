"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setRoleId(parsedUser.userData.roleId || 2);
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
        setRoleId(null);
      }
    }
  }, []);

  const menuItems = useMemo(() => {
    const items = [{ key: "/dashboard/project", label: "Proyectos", path: "/dashboard/project" }];

    if (roleId === 1) {
      items.unshift({ key: "/dashboard/user", label: "Usuarios", path: "/dashboard/user" });
    }

    return items;
  }, [roleId]);

  const handleLogout = () => {
    document.cookie = "tokenjwt=; path=/; domain=" + window.location.hostname + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("user");
    toast.success("Sesión cerrada");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 rounded-lg font-medium transition ${pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-gray-200 p-2 rounded-lg text-gray-600"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                router.push(item.path);
                setMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 ${pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
