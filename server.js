const express = require('express');

const studentRoutes = require('./src/student/routes');
const app = express();

app.use(express.json());

app.use('/api/v1/students', studentRoutes);

app.listen(3000);