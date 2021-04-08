# Wallet-API

wallet API allow users to create account, fund their wallet from their Debit cards and send of money as a gift to another user. It is built on top of NodeJS and Express. It is higly flexible because it provides users with opportunity to:

- Sign up
- Sign in
- Fund wallet using PAYSTACK API
- Send money from wallet

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/Wallet-API)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A REST API client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- In a browser address bar navigate to 'http://localhost:3000'

# Using wallet API through a restful client

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST,

### Signin

- Use the POST method
- Use this url http://localhost:3000/api/v1/signin

### Signup

- Use the POST method
- Use this url http://localhost:3000/api/v1/signup

- As user get signup automatically the balance is Zero

- Use the GET method
- Use this url http://localhost:3000/api/v1/users
- To get all users with their corresponding accounts (token is needed)

### Fund Wallet

- Use the POST method (token is needed)
- Use this url http://localhost:3000/api/v1/paystack/fund
- Paystack url is generated and used on the browser

- Use the GET method
- Use this url http://localhost:3000/api/v1/paystack/callback
- A verify payment to update the user balance is called automatically

- Use the GET method
- Use this url http://localhost:3000/api/v1/receipt/:id
- To get user initial transaction receipt (token is needed)

### Send money from Wallet

- Use the POST method
- Use this url http://localhost:3000/api/v1/transfer

- Use the GET method
- Use this url http://localhost:3000/api/v1/gift-history
- To get user gift history (token is needed)

### Get Account balance from Wallet

- Use the GET method
- Use this url http://localhost:3000/api/v1/account (token is needed)

### Withdraw money to bank Account from Wallet

- Use the POST method
- Use this url http://localhost:3000/api/v1/send-to-account
- User can send money from his wallet to his account number specifying account and bank (token is needed)

- Use the GET method
- Use this url http://localhost:3000/api/v1/withdraw-history
- To get user withdraw history (token is needed)

## Built With

- NodeJs
- Express
- MySQL (database)
- Sequelize (ORM)

## Author

- AbonyiXavier
