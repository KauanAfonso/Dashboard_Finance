const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config(); // Carrega variáveis do .env

const app = express()//instancia o express
app.use(cors())
app.use(express.json())//permite que o express entenda json

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB conectado'))
.catch((err) => console.error('❌ Erro ao conectar MongoDB:', err));

//rotas 
const routes = require('./routes/userRoutes');
app.use('', routes) //adiciona as rotas do arquivo userRoutes.js

PORT = process.env.PORT || 3000 //pega a porta do .env ou a 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));