//Para levantar el servidor

const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config.js');
const taskRoutes = require('./routes/tasks.js')

app.use(express.json());
app.use('/', taskRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));