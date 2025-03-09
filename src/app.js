import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import lockerRoutes from './routes/lockerRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json()); // Para analizar el cuerpo de las peticiones JSON

// Rutas
app.use('/lockers', lockerRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });

export default app;