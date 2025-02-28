import app from './app.js';

const PORT = app.get('port');

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en: http://localhost:${PORT}`);
});

export default server;
