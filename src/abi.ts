const abi = [
  {
    inputs: [],
    method_id: "0faee56f",
    name: "_maxTaxSwap",
    names: ["uint256"],
    outputs: [
      {
        type: "uint256",
        value: "10000000000000000",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    method_id: "bf474bed",
    name: "_taxSwapThreshold",
    names: ["uint256"],
    outputs: [
      {
        type: "uint256",
        value: "10000000000000000",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    method_id: "dd62ed3e",
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    method_id: "70a08231",
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    method_id: "313ce567",
    name: "decimals",
    names: ["uint8"],
    outputs: [
      {
        type: "uint8",
        value: "9",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    method_id: "06fdde03",
    name: "name",
    names: ["string"],
    outputs: [
      {
        type: "string",
        value: "Chill Bro",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    method_id: "8da5cb5b",
    name: "owner",
    names: ["address"],
    outputs: [
      {
        type: "address",
        value: "0x0000000000000000000000000000000000000000",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    method_id: "95d89b41",
    name: "symbol",
    names: ["string"],
    outputs: [
      {
        type: "string",
        value: "CBRO",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    method_id: "18160ddd",
    name: "totalSupply",
    names: ["uint256"],
    outputs: [
      {
        type: "uint256",
        value: "1000000000000000000",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export default abi;
