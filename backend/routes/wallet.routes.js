const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

router.post('/create', walletController.createWallet);
router.get('/wallets', walletController.getAllWallets);
router.get('/balance/:walletNumber', walletController.getBalance);
router.get('/transactions/:walletNumber', walletController.getTransactions);
router.post('/deposit', walletController.deposit);
router.post('/send', walletController.send);

module.exports = router;
