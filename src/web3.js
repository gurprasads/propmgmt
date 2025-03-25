import Web3 from "web3";
import { contractABI } from "./contractABI";
import { contractAddress } from "./contractABI";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.enable();
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) {
  // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  const provider = new Web3.providers.HttpProvider("http://localhost:3000");
  web3 = new Web3(provider);
}

const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };