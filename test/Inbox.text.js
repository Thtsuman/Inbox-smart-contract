const assert = require("assert");
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object ,arguments: ['Hy there']})
    .send({ from: accounts[0], gas: '1000000'})
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();

    assert.equal(message, 'Hy there')
  })

  it('can change message', async () => {
    await inbox.methods.setMessage('Bye').send({
      from: accounts[0]
    })

    const message = await inbox.methods.message().call();

    assert.equal(message, 'Bye')
  })
})
