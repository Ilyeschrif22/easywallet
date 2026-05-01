const { wallets, users, transactions, getNextTransactionId, generateWalletNumber, generateCVV, generateExpiry } = require('../models/wallet.model');
const { encrypt, decrypt } = require('../utils/encryption');

const createWallet = (userInfo) => {
    const { username, lastName, email, password } = userInfo;
    const walletNumber = generateWalletNumber();
    const cvv = generateCVV();
    const expiryDate = generateExpiry();

    users[walletNumber] = {
        username,
        lastName,
        email,
        password: encrypt(password),
        cvv: encrypt(cvv),
        expiryDate,
        createdAt: new Date().toISOString()
    };

    wallets[walletNumber] = encrypt(0);
    return { walletNumber, cvv, expiryDate, username, lastName, email };
};

const getBalance = (walletNumber) => {
    const encryptedBalance = wallets[walletNumber];
    if (!encryptedBalance) return 0;
    return parseFloat(decrypt(encryptedBalance));
};

const getAllWallets = () => {
    const allWallets = {};
    for (const [walletNumber, encryptedBalance] of Object.entries(wallets)) {
        allWallets[walletNumber] = parseFloat(decrypt(encryptedBalance));
    }
    return allWallets;
};

const getTransactions = (walletNumber) => {
    return transactions.filter(
        t => t.from === walletNumber || t.to === walletNumber || t.target === walletNumber
    ).map(t => ({
        ...t,
        amount: parseFloat(decrypt(t.encryptedAmount))
    })).reverse();
};

const deposit = (walletNumber, amount) => {
    let balance = getBalance(walletNumber);
    balance += amount;
    wallets[walletNumber] = encrypt(balance);

    const transaction = {
        id: getNextTransactionId(),
        type: 'deposit',
        target: walletNumber,
        encryptedAmount: encrypt(amount),
        currency: 'TND',
        timestamp: new Date().toISOString()
    };
    transactions.push(transaction);

    return { balance, currency: 'TND', transaction: { ...transaction, amount } };
};

const send = (fromWalletNumber, toWalletNumber, amount) => {
    const senderBalance = getBalance(fromWalletNumber);
    if (senderBalance < amount) {
        throw new Error('Insufficient funds');
    }

    let receiverBalance = getBalance(toWalletNumber);

    wallets[fromWalletNumber] = encrypt(senderBalance - amount);
    wallets[toWalletNumber] = encrypt(receiverBalance + amount);

    const transaction = {
        id: getNextTransactionId(),
        type: 'transfer',
        from: fromWalletNumber,
        to: toWalletNumber,
        encryptedAmount: encrypt(amount),
        currency: 'TND',
        timestamp: new Date().toISOString()
    };
    transactions.push(transaction);

    return {
        balances: {
            sender: senderBalance - amount,
            receiver: receiverBalance + amount
        },
        currency: 'TND',
        transaction: { ...transaction, amount }
    };
};

module.exports = {
    createWallet,
    getAllWallets,
    getBalance,
    getTransactions,
    deposit,
    send
};
