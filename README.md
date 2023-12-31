# Vencura
Create and managed custodial wallets as well as interact with connected non-custodial wallets


**Demo:** https://vencura-lilac.vercel.app

**Demo API:** https://vencura-api-production.up.railway.app/docs (https://github.com/matt-mertens/vencura-api)

![Home page](/screenshots/home.png)

| Wallet detail                           | Wallet activity                           |
| ------------------------------------ | -------------------------------------- |
| ![Wallet detail](/screenshots/wallet-detail.png) | ![Upload](/screenshots/wallet-activity.png) |
## Table of Contents

- [Getting started](#getting-started)

# Getting Started
Currently the application is only built to work with the Ethereum Goerli test network. Users can login using Dynamic with either an email or wallet. If the user logs in with a wallet they will be able to sign and send transactions with their non-custodial wallet as well. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables
```
REACT_APP_BASE_API=
REACT_APP_DYNAMIC_ENVIRONMENT_ID=
```