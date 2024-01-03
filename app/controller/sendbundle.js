const { Controller } = require('egg');
const axios = require('axios');

const rpcList = [{
//   name: 'FLASHBOTS',
//   url: 'https://relay.flashbots.net',
// }, {
  name: 'BUILDER0X69',
  url: 'http://builder0x69.io/',
}, {
  name: 'BEAVERBUILD',
  url: 'https://rpc.beaverbuild.org/',
}, {
  name: 'RSYNC',
  url: 'https://rsync-builder.xyz',
}, {
  name: 'TITAN',
  url: 'https://rpc.titanbuilder.xyz',
}, {
  name: 'JETBLDR',
  url: 'https://rpc.jetbldr.xyz',
}, {
  name: 'GMBIT',
  url: 'https://builder.gmbit.co/rpc',
}];
class SendBundleController extends Controller {
  async index() {
    const { ctx } = this;
    // 请求配置
    const config = {
      method: 'post', // 设置请求方法为 POST
      headers: {
        'Content-Type': 'application/json', // 设置请求头的 Content-Type
        // 'X-Flashbots-Signature': ctx.request.body.signature, // 设置 Authorization 头（示例：Bearer token）
      },
      data: ctx.request.body.postData, // 将请求体数据传递给 data 属性
    };
    const result = await Promise.all(rpcList.map(({ url }) => {
      return axios({
        ...config,
        url, // 请求的 URL
      });
    }));
    const resultBody = result.map(({ config, data }) => ({
      url: config.url,
      ...data,
    }));
    console.log(resultBody);
    ctx.type = 'json';
    ctx.body = resultBody;
    return;
  }
}

module.exports = SendBundleController;
