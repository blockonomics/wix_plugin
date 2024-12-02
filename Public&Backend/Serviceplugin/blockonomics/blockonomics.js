import * as paymentProvider from 'interfaces-psp-v1-payment-service-provider';
import wixPaymentProviderBackend from 'wix-payment-provider-backend';
import wixSecretsBackend from "wix-secrets-backend";



import { Permissions, webMethod } from "wix-web-module";
import { fetch } from "wix-fetch";
import wixData from 'wix-data';

const GET_CALLBACKS_URL = 'https://wwww.blockonomics.co/api/address?&no_balance=true&only_xpub=true&get_callback=true';

/**
 * This payment plugin endpoint is triggered when a merchant provides required data to connect their PSP account to a Wix site.
 * The plugin has to verify merchant's credentials, and ensure the merchant has an operational PSP account.
 * @param {import('interfaces-psp-v1-payment-service-provider').ConnectAccountOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').ConnectAccountResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const connectAccount = async (options, context) => {  
  const apiKey = options.credentials.apikey;
  const secret = options.credentials.secret;

  try {
    await testSetup(apiKey, secret);
  } catch (e) {
    throw "Test setup Failed: " + e
  }

  let insertconfig = {
    "title": secret,
    "apikey": apiKey
  };

  await wixData.insert("blockonomics_config", insertconfig)

  return {
      credentials: {
          apikey: apiKey,
          secret: secret
      },
      accountId: secret,
      accountName: apiKey
  };
};
/**
 * This payment plugin endpoint is triggered when a buyer pays on a Wix site.
 * The plugin has to process this payment request but prevent double payments for the same `wixTransactionId`.
 * @param {import('interfaces-psp-v1-payment-service-provider').CreateTransactionOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').CreateTransactionResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const createTransaction = async (options, context) => {
  const apiKey = options.merchantCredentials.apikey;
  const  newAddress = await generateNewAddress(apiKey);
  
   const btcprice = await getBtcPrice(options.order.description.currency);
   const orderamount = options.order.description.totalAmount / 100;
   const btcAmount = orderamount / btcprice;
    let inserttxn = {
      "title": newAddress,
      "plugintxn": "e89b-12d3-a456-42665",
      "wixtxn":options.wixTransactionId
    };

    await wixData.insert("blockonomics_transaction", inserttxn)
    
    return {
        //reasonCode: 5009,
        pluginTransactionId: "e89b-12d3-a456-42665",
        redirectUrl: `https://"YOUR-SITE-URL"/my-site/paymentpage?address=${newAddress}&price=${btcAmount}&redirect=${options.order.returnUrls.pendingUrl}`
    };
};
/**
 * This payment plugin endpoint is triggered when a merchant refunds a payment made on a Wix site.
 * The plugin has to process this refund request but prevent double refunds for the same `wixRefundId`.
 * @param {import('interfaces-psp-v1-payment-service-provider').RefundTransactionOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').CreateRefundResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const refundTransaction = async (options, context) => {
    return {
        pluginRefundId: "e89b-12d3-a456-42665"
    };
};

const generateNewAddress = webMethod(
  Permissions.Anyone,
  async (apiKey) => {
    const fetchOptions = {
      method: "post",
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    };

    const response = await fetch(
      'https://blockonomics.co/api/new_address?match_callback='/*part of your callback url*/'',
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data.address;
  },
);

const testBTCCallback = webMethod(
  Permissions.Anyone,
  async (apiKey) => {
    const fetchOptions = {
      method: "get",
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    };

    const response = await fetch(
      'https://www.blockonomics.co/api/address?&no_balance=true&only_xpub=true&get_callback=true',
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data;
  },
);

const testSetup = webMethod(
  Permissions.Anyone,
  async (apiKey, secret) => {
    if (!apiKey) {
      throw "No API key found"
    }
    if (!secret) {
      throw "No Secret found"
    }

    try {
      await testBTCCallback(apiKey);
    } catch (e) {
      throw "Error while testing callback " + e
    }

    try {
      await generateNewAddress(apiKey);
    } catch (e) {
      throw "Error while generating new address"
    }
  },
);

const getBtcPrice = webMethod(Permissions.Anyone, async (currency) => {
  const response = await fetch(
    `https://www.blockonomics.co/api/price?currency=${currency}`,
  );
  if (response.ok) {
    const json = await response.json();
    return json.price;
  } else {
    return Promise.reject("Fetch did not succeed");
  }
});

