const express = require('express');
const cors = require('cors');
const path = require('path');
const walletRoutes = require('./routes/wallet.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Easy Wallet Backend running on port ${PORT}`);
});
