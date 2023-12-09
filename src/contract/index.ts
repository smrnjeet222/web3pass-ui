export const ADDRESS = "0x84f378100d3E501793a1F23612f25802bbdf234b";

export const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "companyId",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address",
      },
    ],
    "name": "AuthRegister",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "domain",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "data",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address",
      },
    ],
    "name": "passwordAdd",
    "type": "event",
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "domain",
        "type": "string",
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string",
      },
    ],
    "name": "addPassword",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "data",
        "type": "string",
      },
      {
        "internalType": "address",
        "name": "oAuth",
        "type": "address",
      },
    ],
    "name": "authLogin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "authLogins",
    "outputs": [
      {
        "internalType": "string",
        "name": "data",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "name": "auths",
    "outputs": [
      {
        "internalType": "string",
        "name": "pubKey",
        "type": "string",
      },
      {
        "internalType": "string",
        "name": "companyId",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256",
      },
    ],
    "name": "getPassword",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "domain",
            "type": "string",
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string",
          },
        ],
        "internalType": "struct Password",
        "name": "password",
        "type": "tuple",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "name": "records",
    "outputs": [
      {
        "internalType": "string",
        "name": "domain",
        "type": "string",
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "publicKey",
        "type": "string",
      },
      {
        "internalType": "string",
        "name": "companyId",
        "type": "string",
      },
    ],
    "name": "registerForOauth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];
