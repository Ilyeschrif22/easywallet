<img width="1900" height="900" alt="image" src="https://github.com/user-attachments/assets/6e8a89d8-8162-465f-8254-f56be2053d17" />

# EasyWallet API Documentation

EasyWallet is a virtual wallet system that allows users to create wallets, check balances, view transaction history, deposit funds, and transfer money between accounts.

## Base URL
The backend server runs on `http://localhost:5000/api/wallet` by default.

## Endpoints

### 1. Create Wallet
Create a new virtual wallet for a user.

- **URL:** `/create`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "johndoe",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response:** `201 Created`



### 2. Get All Wallets
Retrieve a list of all registered wallets.

- **URL:** `/wallets`
- **Method:** `GET`
- **Success Response:** `200 OK` (Returns an array of wallets)



### 3. Get Wallet Balance
Check the current balance of a specific wallet.

- **URL:** `/balance/:walletNumber`
- **Method:** `GET`
- **Path Parameters:**
    - `walletNumber`: The unique account number of the wallet.
- **Success Response:** `200 OK`



### 4. Get Transaction History
View the history of deposits and transfers for a wallet.

- **URL:** `/transactions/:walletNumber`
- **Method:** `GET`
- **Path Parameters:**
    - `walletNumber`: The unique account number of the wallet.
- **Success Response:** `200 OK`



### 5. Deposit Funds
Add money to a virtual wallet.

- **URL:** `/deposit`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "walletNumber": "1234567890",
    "amount": 100.50
  }
  ```
- **Success Response:** `200 OK`



### 6. Send Money (Transfer)
Transfer funds from one wallet to another.

- **URL:** `/send`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "fromWalletNumber": "1234567890",
    "toWalletNumber": "0987654321",
    "amount": 50.00
  }
  ```
  *(Note: You can also use `senderWalletNumber` and `recipientWalletNumber` as keys)*
- **Success Response:** `200 OK`
