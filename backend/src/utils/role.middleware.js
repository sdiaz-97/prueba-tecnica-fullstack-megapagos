export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {

    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      return next();
    } catch (error) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

  };
};
