

const Transaction = require('../models/userModel'); // Importa o modelo Transaction

const create_transaction = async (req, res)=>{
    try{
        const send_transaction = await Transaction.create(req.body)
        res.status(201).json(send_transaction) //retorna o objeto criado
    }catch(err){
        res.status(500).json({message: err.message}) //retorna o erro
    }

}

const get_transactions = async (req, res)=>{
    try{
        const transactions = await Transaction.find()//Pega todas as transações o metodo ()
        res.status(200).json(transactions) //retorna todas as transações em json
    }
    catch(err){
        res.status(500).json({message: err.message}) //retorna o erro
    }
}

const get_one_transaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findById(req.params.id) //Pega uma transação pelo id
        res.status(200).json(transaction) //retorna a transação em json
    }catch(err){
        res.status(500).json({message: err.message}) //retorna o erro
    }
}

const update_transaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) //Pega uma transação pelo id
        res.status(200).json(transaction) //retorna a transação em json
    }catch(err){
        res.status(500).json({message: err.message}) //retorna o erro
    }
}


const delete_transation = async(req,res)=>{
    try{
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        res.status(200).json(transaction) 
    }catch(err){
        res.status(500).json({message: err.message}) //retorna o erro
    }

}


module.exports = {create_transaction, get_transactions, get_one_transaction , update_transaction, delete_transation}