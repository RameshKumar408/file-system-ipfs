/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
const Web3 = require('web3')

const { buildErrObject } = require('../../middleware/utils')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const senderc20Token = async (data) => {
    // console.log(data, "data")

    return new Promise(async (resolve, reject) => {
        // console.log(data.provider, "provide")
        const web3 = new Web3(
            new Web3.providers.HttpProvider(data.provider)
        )
        try {
            const contractInstance = new web3.eth.Contract(
                data.contractABI,
                data.contractAddress
            );
            const checkBalance = await contractInstance.methods.balanceOf(data.from_address).call()
            console.log("returnnewPromise  checkBalance:", checkBalance)
            var decimalBal = Number(checkBalance) / (10 ** (Number(data?.decimal)))
            console.log("returnnewPromise  decimalBal:", decimalBal)
            if (Number(checkBalance) > 0 && decimalBal >= data?.amount) {
                const txObject = {
                    from: data.from_address,
                    // nonce: "0x" + count.toString(16),
                    to: data.contractAddress,
                    gas: 100000,
                    value: "0x0",
                    data: contractInstance.methods.transfer(data.to_address,
                        web3.utils.toHex(Number(data?.amount) * (10 ** (Number(data?.decimal))))).encodeABI(),
                    // gasPrice: gasprice
                }
                console.log(txObject, "obj")
                // var datas = contractInstance.methods.transfer(data.to_address, data.amount).encodeABI();
                web3.eth.accounts.signTransaction(txObject, data?.privatekey, (err, res) => {
                    if (err) {
                        console.log('err', err)
                        reject(buildErrObject(422, err.message))

                    }
                    // else {
                    //     console.log('res', res)
                    // }
                    const raw = res.rawTransaction
                    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                        if (err) {
                            console.log(err)
                            reject(buildErrObject(422, err.message))
                        }
                        else {
                            console.log("txHash:", txHash)
                            resolve(txHash)
                        }
                    })
                })
            } else {
                reject(buildErrObject(422, "Not Enough Balance"))
            }

        } catch (error) {
            reject(buildErrObject(422, error.message))
        }
    })
}
module.exports = { senderc20Token }
