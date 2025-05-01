
const mongoose = require('mongoose');


//Criando o schema das transações
const transactionSchema = new mongoose.Schema({
    name: String,
    value: Number,
    type_t:String
}, { timestamps: true }); //timestamps 

module.exports = mongoose.model('Transaction', transactionSchema); //exporta o modelo Transaction