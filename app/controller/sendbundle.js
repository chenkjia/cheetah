const { Controller } = require('egg');
const axios = require('axios');

const rpcList = [{
  // name: 'FLASHBOTS',
  // url: 'https://relay.flashbots.net',
}, {
  name: 'BUILDER0X69',
  url: 'http://builder0x69.io/',
// }, {
//   name: 'EDENNETWORK',
//   url: 'https://api.edennetwork.io/v1/bundle',
// }, {
//   name: 'BEAVERBUILD',
//   url: 'https://rpc.beaverbuild.org/',
// }, {
//   name: 'LIGHTSPEEDBUILDER',
//   url: 'https://rpc.lightspeedbuilder.info/',
// }, {
//   name: 'ETH_BUILDER',
//   url: 'https://eth-builder.com/',
// }, {
//   name: 'ULTRASOUND',
//   url: 'https://relay.ultrasound.money/',
}];
class SendBundleController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.body = 'hi, egg';
    rpcList.forEach(async ({ url }) => {
      return await axios.post(url, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendBundle',
        params: [
          {
            txs: [ '0x123abc...', '0x456def...' ],
            blockNumber: '0xb63dcd',
            minTimestamp: 0,
            maxTimestamp: 1615920932,
          },
        ],
      }).then(console.log).catch(console.error);
    });
  }
}

module.exports = SendBundleController;
