## Requirements:

- WIX account 
- Free [Blockonomics](https://www.blockonomics.co/) account
- Bitcoin wallet (e.g., Blockchain.info, Trezor, Electrum, Mycelium)


## Blockonomics Wix Integration Setup Guide:

## Table of Contents

1. [Create a Payment Provider Plugin](#1-create-a-payment-provider-plugin)
2. [Implement Your Plugin with Custom Code](#2-implement-your-plugin-with-custom-code)
3. [Implement the Callback URL](#3-implement-the-callback-url)
4. [Implement the Payment Page](#4-implement-the-payment-page)
5. [Create Required Databases](#5-create-required-databases)

## 1. Create a Payment Provider Plugin

### Steps:


1. In the Velo Sidebar, go to Service Plugins > Payment
<img width="396" alt="image" src="https://github.com/user-attachments/assets/75dce07b-7aaf-4262-8a2f-b5bee905752f">

2.  Hover over **Service Plugins** and click on + 

3. Select **Payment**.
<img width="433" alt="image" src="https://github.com/user-attachments/assets/fb379d04-4987-41e8-985b-6600e7a0893a">

4.  Name the plugin "Blockonomics"  
<img width="433" alt="image" src="https://github.com/user-attachments/assets/da2bc950-35aa-4d8b-a0b2-36787168ec9b">

5. Click "Add & Edit Code”
  
## 2. Implement Your Plugin with Custom Code

### Steps: 

1. Edit files:
   - blockonomics-config.js
   - blockonomics.js
     
 <img width="532" alt="image" src="https://github.com/user-attachments/assets/9ceb7686-5ed4-443f-95ca-bbac92ce1438">

2. Copy code from GitHub:
   Path: [Public&Backend/Serviceplugin/blockonomics](https://github.com/ashthecoder05/wix-bitcoin-plugin/tree/main/Public%26Backend/Serviceplugin/blockonomics)
   
3. In blockonomics.js:
   Update line 77: redirectUrl = 'YOUR_SITE_URL'

4. Verify:
   Settings > Accept payment
<img width="1441" alt="image" src="https://github.com/user-attachments/assets/8764f604-2308-45b6-af1f-7b8013e15e80">

## 3. Implement the Callback URL

### Steps:
1. Create file: http-functions.js at Public&Backend > Backend folder in wix studio as below
 <img width="397" alt="image" src="https://github.com/user-attachments/assets/41585b33-736e-4363-afd8-c8d9f4159cc4">

2. Copy code from GitHub:
   Path: [Public&Backend/Backend/http-functions.js](https://github.com/ashthecoder05/wix-bitcoin-plugin/blob/main/Public%26Backend/Backend/http-functions.js)

## 4. Implement the Payment Page

### Steps:
1. Create file: PaymentPage.js  at Pagecode > MainPage in the Wix site editor as shown below
<img width="441" alt="image" src="https://github.com/user-attachments/assets/fb9a4c16-ae64-4fff-8125-a3b0d482f1d0">

2. Copy code from GitHub:
   Path: [Pagecode/MainPage/PaymentPage.js](https://github.com/ashthecoder05/wix-bitcoin-plugin/blob/main/PageCode/MainPage/PaymentPage.js)

3. Update paymentPage.js:
   Line 55: url = 'YOUR_SITE_URL'

4.  Create in Wix editor:
   - 2 input boxes
   - 3 labels (Heading, Address, Price)
<img width="1062" alt="image" src="https://github.com/user-attachments/assets/317f6ed2-15cf-43b8-90bd-d97c6d94c3a7">

5. To create a input box you need follow the steps as shown in the screenshot below 
  <img width="1339" alt="image" src="https://github.com/user-attachments/assets/ac719c9b-6eea-43d4-8499-e0b3ebe51ef6">

6. Update paymentPage.js with element IDs.For example  first image shows how to get input box id  as #input3 in the below image same way do it for the input box 2 as we need two input box one to display the address and other for price 
 
 <img width="440" alt="image" src="https://github.com/user-attachments/assets/9de6a380-52ba-4bb4-a0a0-7deb1440c40d">

- Replace the input id  in the file PaymentPage.js  code at line 23  and 37 in the file  which is shown in the image below with input id you get from the input box created on the Wix page 

  <img width="440" alt="image" src="https://github.com/user-attachments/assets/7d89cf76-af46-4072-800b-c0ff46a06e1b">
  
  <img width="440" alt="image" src="https://github.com/user-attachments/assets/1d5bbabc-21af-4c26-8fd2-0b10aa3b0cc1">

7. In the same way create three labels one for the heading and the other two labels for "Address" & "Price ". To get the label ID as shown below you will get the label ID as #text1
 
 <img width="1083" alt="image" src="https://github.com/user-attachments/assets/e9b9daa6-c063-448d-8851-3c513d906481">

- Replace the heading label id at code line number 19 as shown in the image below a and b
- In Wix editor Page

a) <img width="714" alt="image" src="https://github.com/user-attachments/assets/efcfba64-65da-4647-89e9-e7753f0361dd">

- In Wix editor code 

b) <img width="686" alt="image" src="https://github.com/user-attachments/assets/1e25ab2c-4407-4dc4-966d-b9b06bcfcee0">

- Replace the Address label id at code line number 22 as shown in the image below a and b
-  In Wix editor Page

a) <img width="284" alt="image" src="https://github.com/user-attachments/assets/4272bed8-ee88-4a27-ac05-68c990cc5584">

- In Wix editor code 

b) <img width="375" alt="image" src="https://github.com/user-attachments/assets/4685c5be-862a-4976-954d-880067b9f46a">

- Replace the Address label id at code line number 36 as shown in the image below a and b
- In Wix editor Page

a) <img width="355" alt="image" src="https://github.com/user-attachments/assets/11fd016e-0fbb-4435-a082-ddac779f03a4">

- In Wix editor code 

b) <img width="681" alt="image" src="https://github.com/user-attachments/assets/1ff4a5fb-00f9-4398-abda-f1b6344ce8d6">


## 5. Create Required Databases

1. To create a database you need to select in Wix site editor Database> Your Collections > + button > Create Collection
 
 <img width="497" alt="image" src="https://github.com/user-attachments/assets/1fb44a55-db30-4961-ab34-cf9a7b1c7d06">

2. Need to create two database tables one table "blockonomics_config" with fields for configs records as shown below
 
 <img width="533" alt="image" src="https://github.com/user-attachments/assets/6ac02f8d-d411-4809-a2cd-ab5736ebe9f9">

3. Declare the field name and field Types  as image below 

a) secret
 
<img width="622" alt="image" src="https://github.com/user-attachments/assets/62fa15e9-4f63-4358-ae23-655b5e877039">

b) apikey

<img width="622" alt="image" src="https://github.com/user-attachments/assets/2e4e910f-b317-421a-95c2-99940286124e">


4. Other table blockonomics_transaction for saving the transaction details with fields for transaction records as shown below

<img width="1012" alt="image" src="https://github.com/user-attachments/assets/c9e4f77e-5a72-41a9-beeb-360a41bd9191">


5. Declare the field name and field Types  as image below

a) addr

<img width="622" alt="image" src="https://github.com/user-attachments/assets/fccdd8f6-31df-4dc6-8955-62ffda3ba71e">

b) plugintxn
 
 <img width="622" alt="image" src="https://github.com/user-attachments/assets/577961bf-fcf2-44fa-9b69-d0d6d2c2eef6">

c) wixtxn
 
 <img width="622" alt="image" src="https://github.com/user-attachments/assets/9f4f4b75-92ff-45f5-92d9-7b32e0d39901">

d) status
 
 <img width="622" alt="image" src="https://github.com/user-attachments/assets/512124ab-de94-4dd1-bbe8-affebfe48dff">

e) txid

<img width="622" alt="image" src="https://github.com/user-attachments/assets/a7d4ce81-a7f7-4529-ab7b-a96c2f8afdb8">

f) value

<img width="622" alt="image" src="https://github.com/user-attachments/assets/79edb9c0-ff35-44a4-8e3c-edb8ec166a6f">
    


# Setting up Blockonomics Store for Wix Website

## Table of Contents
1. [Setup the API Key and Secret](#1-setup-the-api-key-and-secret)
   1.1 [Add API Key](#11-add-api-key)
   1.2 [Set up Secret](#12-set-up-secret)
2. [Security Note](#2-security-note)
3. [Create the Callback URL](#3-create-the-callback-url)
4. [Add Callback URL to Blockonomics Store](#4-add-callback-url-to-blockonomics-store)


## 1. Setup the API Key and Secret
### 1.1 Add API Key
- Add the API key that you get from blockonomics site and add it to the settings page
- <img width="1228" alt="image" src="https://github.com/user-attachments/assets/0ae888f0-253c-4455-a625-9fa6736df834">

### 1.2 Set up Secret
- Add the secret of your choice, for example it can be "abdhdhjdhdn"    
- <img width="1254" alt="image" src="https://github.com/user-attachments/assets/b40a0f9e-5909-41e0-a372-52632221248f">

## 2. Security Note
- Keep your API Key and Secret secure
- Do not share these credentials with unauthorized parties


## 3. Create the Callback URL
- Customer gets their Wix store address (e.g., https://example.wixsite.com/my-site)
- Our URL extension is added (_functions/blockonomicscallback?secret=)
- Customer generates a secret and adds it at the end of the URL
- Example: https://example.wixsite.com/my-site/_functions/blockonomicscallback?secret=123353

## 4. Add Callback URL to Blockonomics Store
- Add the callback URL to the blockonomics store which you have created in the previous steps

  
  


  

