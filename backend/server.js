require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swaggerUi = require('swagger-ui-express');
const { connectDB } = require('./src/config/db');
const { swaggerSpec } = require('./src/config/swagger');
const apiRoutes = require('./src/routes/index');
const { errorHandler } = require('./src/middlewares/errorHandler.middleware');
const { ApiError } = require('./src/utils/ApiError');

const app = express();

// --------------- Security Middleware ---------------
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());

// --------------- API Documentation ---------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------- API Routes ---------------
app.use('/api/v1', apiRoutes);

// --------------- 404 Handler ---------------
app.use((req, _res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// --------------- Global Error Handler ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
});
