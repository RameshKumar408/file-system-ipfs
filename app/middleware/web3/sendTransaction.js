const Web3 = require('web3')
const { buildErrObject } = require('../../middleware/utils')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// const data = {
//     from_address: from_address,
//     to_address: to_address,
//     privatekey: privatekey,
//     amount: "0.0004",
//     chain_id: "5"
// }
const sendTransaction = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(data.provider))
      const datas = {}
      const getGasAmount = (fromAddress, toAddress, amount) => {
        const gasAmount = web3.eth.estimateGas(
          {
            to: toAddress,
            from: fromAddress,
            value: web3.utils.toWei(`${amount}`, 'ether')
          },
          (error, receipt) => {
            if (error) {
              reject(buildErrObject(422, error.message))
              return
            } else {
              return receipt
            }
          }
        )
        return gasAmount
      }
      const value = await web3.utils.toWei(data.amount, 'ether')
      const gas = await web3.utils.toWei(`${data.gas}`, 'gwei')
      // const gas = await getGasAmount(
      //   data.from_address,
      //   data.to_address,
      //   data.amount
      // )
      // var handleReceipt = (error, receipt) => {
      //     if (error) {
      //         console.error(error, "ramesh");
      //         buildErrObject(422, error)
      //     }
      //     else {
      //         return receipt
      //     }
      // }

      await web3.eth.accounts.signTransaction(
        {
          from: data.from_address,
          to: data.to_address,
          value,
          gas
          // common: {
          //     customChain: {
          //         name: 'Sepolia Test Netwok',
          //         chainId: 11155111,
          //         networkId: 11155111
          //     }
          // }
        },
        data.privatekey,
        (error, receipt) => {
          if (error) {
            reject(buildErrObject(422, error.message))
            return
          } else {
            datas.signedtransaction = receipt
          }
        }
      )
      console.log(datas.signedtransaction)
      if (datas.signedtransaction !== undefined) {
        await web3.eth.sendSignedTransaction(
          datas.signedtransaction.rawTransaction,
          (error, receipt) => {
            if (error) {
              reject(buildErrObject(422, error.message))
              return
            } else {
              datas.transaction_receipt = receipt
            }
          }
        )
      }
      if (datas.signedtransaction && datas.transaction_receipt) {
        resolve(datas)
        // await web3.eth.getTransactionReceipt(datas.signedtransaction.transactionHash, (error, receipt) => {
        //     if (error) {
        //         reject(buildErrObject(422, error.message))
        //         return;
        //     } else {
        //         resolve(datas)
        //     }
        // })
      }
    } catch (error) {
      reject(buildErrObject(422, error.message))
    }
  })
}
module.exports = { sendTransaction }
