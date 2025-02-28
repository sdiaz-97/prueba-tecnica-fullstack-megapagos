# prueba-tecnica-fullstack-megapagos

# Plataforma de Gestión de Usuarios y Proyectos

## Descripción

Plataforma que permite a administradores gestionar usuarios y proyectos, asegurando control de accesos y permisos mediante un sistema de roles.

Al iniciar la aplicación, se crea automáticamente un usuario administrador y un usuario normal:

- **Correo**: `admin@hotmail.com`
- **Contraseña**: `admin`

- **Correo**: `user@hotmail.com`
- **Contraseña**: `user`

El sistema implementa **JWT** para la autenticación y autorización de usuarios,  
diferenciando entre administradores y empleados para el acceso a rutas específicas.   

## Instalación y Ejecución

### Requisitos previos

- **Docker** y **Docker Compose**  

### Pasos para ejecutar la aplicación

1. **Clonar el repositorio**  
   ```sh
   git clone https://github.com/sdiaz-97/prueba-tecnica-fullstack-megapagos.git
   cd PruebaRprueba-tecnica-fullstack-megapagosKMC

2. **Para ejecutar el docker**  
   ```Debe ser en PowerShell
    
    **Para windows**

        **Este es el entorno Productivo**
            ```sh
            $env:NODE_ENV="production"; $env:PORT="80"; docker-compose up --build -d 

        **Este es el entorno de Pruebas**
            ```sh
            $env:NODE_ENV="development"; $env:PORT="8080"; docker-compose up --build -d  

    **Para Linux**

        **Este es el entorno Productivo**
            ```sh
            NODE_ENV="production" PORT="80" docker-compose up --build -d linux

        **Este es el entorno de Pruebas**
            ```sh
            NODE_ENV="development" PORT="8080" docker-compose up --build -d


3. **La aplicación estará disponible en http://localhost:8080 Localmente**  


4. **La aplicación estará disponible en http://ec2-44-220-161-148.compute-1.amazonaws.com/ en Nube**  

Nota:
Se realizaron pruebas unitarias tanto para el backend y el frontend con jest, estas se ejecutan automaticamente cuando se corre el contenedor para cualquiera de los dos ambientes.

