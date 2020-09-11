const path = require("path")
const fs = require("fs")
const solc = require("solc")
const { join } = require("path")

const contractFileName = "Inbox.sol"
const contractName = "Inbox"

const inboxPath = path.resolve(__dirname, "contracts", contractFileName)
const source = fs.readFileSync(inboxPath, "utf8")

let complierInput = {
	language: "Solidity",
	sources: {
		[contractFileName]: {
			content: source,
		},
	},
	settings: {
		optimizer: {
			enabled: true,
		},
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
}

console.log("compiling contract")
let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput, 1))).contracts[contractFileName][contractName]
module.exports = {
  Index: JSON.parse(solc.compile(JSON.stringify(complierInput, 1))).contracts[contractFileName][contractName],
  abi: compiledContract.abi,
  bytecode: compiledContract.evm.bytecode
}
console.log("Contract Compiled")

// console.log(
// 	"abi: ",
// 	compiledContract.abi,
// 	"\n ByteCode: ",
// 	compiledContract.evm.bytecode
// )

// for (let contName in compiledContract.contracts[contractName]) {
//   console.log(contName , compiledContract.contracts[contractName][contName].abi);
//   let abi = compiledContract.contracts[contractName][contName].abi;
//   // fs.writeFileSync(`./contracts/bin/${contName}_abi.json` , JSON.stringify(abi));
//   return compiledContract.contracts[contractName][contName];
// }

// console.log(compiledContract)
