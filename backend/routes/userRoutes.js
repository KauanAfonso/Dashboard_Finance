const controller = require('../controllers/userController');
const router = require('express').Router();


router.post('/transaction', controller.create_transaction); //criando uma transação
router.get('/transaction', controller.get_transactions); //criando uma transação
router.get('/transaction/:id', controller.get_one_transaction);
router.put('/transaction/:id', controller.update_transaction);
router.delete('/transaction/:id', controller.delete_transation);

module.exports = router; //exporta as rotas
