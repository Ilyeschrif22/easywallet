const walletService = require('../services/wallet.service');

const createWallet = (req, res) => {
    const { username, lastName, email, password } = req.body;
    if (!username || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Missing user information fields (username, lastName, email, password)' });
    }

    try {
        const result = walletService.createWallet(req.body);
        res.status(201).json({ message: 'Wallet created successfully', wallet: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getBalance = (req, res) => {
    const { walletNumber } = req.params;
    const balance = walletService.getBalance(walletNumber);
    res.json({ walletNumber, balance, currency: 'TND' });
};

const getAllWallets = (req, res) => {
    const wallets = walletService.getAllWallets();
    res.json({ wallets, currency: 'TND' });
};

const getTransactions = (req, res) => {
    const { walletNumber } = req.params;
    const transactions = walletService.getTransactions(walletNumber);
    res.json({ walletNumber, transactions });
};

const deposit = (req, res) => {
    const { walletNumber, amount } = req.body;
    if (!walletNumber || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid walletNumber or amount' });
    }

    try {
        const result = walletService.deposit(walletNumber, amount);
        res.json({ message: 'Deposit successful', ...result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const send = (req, res) => {
    const {
        fromWalletNumber,
        toWalletNumber,
        senderWalletNumber,
        recipientWalletNumber,
        amount
    } = req.body;

    const from = fromWalletNumber || senderWalletNumber;
    const to = toWalletNumber || recipientWalletNumber;

    if (!from || !to || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid parameters. Required: (fromWalletNumber or senderWalletNumber), (toWalletNumber or recipientWalletNumber), and amount (positive number)' });
    }

    try {
        const result = walletService.send(from, to, amount);
        res.json({ message: 'Transfer successful', ...result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createWallet,
    getAllWallets,
    getBalance,
    getTransactions,
    deposit,
    send
};
