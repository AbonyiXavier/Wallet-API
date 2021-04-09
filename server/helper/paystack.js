import axios from 'axios';

exports.initializePayment = async (form) => {
  const options = {
    url: 'https://api.paystack.co/transaction/initialize',
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'POST',
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Verify all transactions before updating their status in the DB
 * @param {String} trxref The reference String to verify the transaction. It will be gotten after successfully
 * initializing a transaction.
 */

exports.verifyPayment = async (ref) => {
  const options = {
    url:
      'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'GET',
  };
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.request(options);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.verifyAccount = async (accNum, bankCode) => {
  const options = {
    url: `https://api.paystack.co/bank/resolve?account_number=${accNum}&bank_code=${bankCode}`,
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'GET',
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
exports.initializeTransferReceipt = async (form) => {
  const options = {
    url: 'https://api.paystack.co/transferrecipient',
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'POST',
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

// Had error using this
exports.initializeTransfer = async (form) => {
  const options = {
    url: 'https://api.paystack.co/transfer',
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'POST',
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
