const wallets = {};
const users = {};
const transactions = [];
let transactionIdCounter = 1;
let walletSequence = 1000;

module.exports = {
    wallets,
    users,
    transactions,
    getNextTransactionId: () => transactionIdCounter++,
    generateWalletNumber: () => {
        const num = () => Math.floor(1000 + Math.random() * 9000);
        return `4000-${num()}-${num()}-${num()}`;
    },
    generateCVV: () => Math.floor(100 + Math.random() * 900).toString(),
    generateExpiry: () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 3);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yy = String(d.getFullYear()).slice(-2);
        return `${mm}/${yy}`;
    }
};
