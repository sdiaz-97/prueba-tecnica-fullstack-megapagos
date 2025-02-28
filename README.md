# Plataforma de Gestión de Usuarios y Proyectos

## Descripción

Plataforma que permite a administradores gestionar usuarios y proyectos, asegurando control de accesos y permisos mediante un sistema de roles.

Al iniciar la aplicación, se crea automáticamente unos usuarios 

- **Administrador**: 

   - **Correo**: `admin@hotmail.com`
   - **Contraseña**: `admin`

- **Usuario**:

   - **Correo**: `user@hotmail.com`
   - **Contraseña**: `user`

El sistema implementa **JWT** para la autenticación y autorización de usuarios,  
diferenciando entre administradores y usuarios para el acceso a rutas específicas.   

## Instalación y Ejecución

### Requisitos previos

- **Docker** y **Docker Compose**  

### Pasos para ejecutar la aplicación

1. **Clonar el repositorio**  
   ```sh
   git clone https://github.com/sdiaz-97/prueba-tecnica-fullstack-megapagos.git
   cd prueba-tecnica-fullstack-megapagos

2. **Para ejecutar el docker**  

    
    **Para windows**

        **Este es el entorno Productivo**
            
            $env:NODE_ENV="production"; $env:PORT="80"; docker-compose up --build -d 

        **Este es el entorno de Pruebas**
            
            $env:NODE_ENV="development"; $env:PORT="8080"; docker-compose up --build -d  

    **Para Linux**

        **Este es el entorno Productivo**
            
            NODE_ENV="production" PORT="80" docker-compose up --build -d

        **Este es el entorno de Pruebas**
            
            NODE_ENV="development" PORT="8080" docker-compose up --build -d

3.**Para el ingresar al proyecto visualmente**

 - **En nube**: http://ec2-44-220-161-148.compute-1.amazonaws.com/

 - **En Local**:  http://localhost:8080/

Nota:
Se realizaron pruebas unitarias tanto para el backend y el frontend con jest, estas se ejecutan automaticamente cuando se corre el contenedor para cualquiera de los dos ambientes.

