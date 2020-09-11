const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const { abi, bytecode } = require("./compile")

const mnemonic = "endless festival coral arch vacuum couple uniform cube fatal such basket else"
const testNetworkUrl = "https://rinkeby.infura.io/v3/b4f977f75c354e6fb04f9c008786d89b"

const provider = new HDWalletProvider(mnemonic, testNetworkUrl)

const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log("Attempting to deploy from account: ", accounts[0])

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode.object, arguments: ["Hi there!"] })
		.send({ gas: "1000000", from: accounts[0] })

	console.log("Contract deployed to: ", result.options.address)

	// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
	provider.engine.stop()
}
deploy()
