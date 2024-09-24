/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
const Web3 = require('web3')

const { buildErrObject } = require('../../middleware/utils')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBalance = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data.provider, "provide")
        const web3 = new Web3(
            new Web3.providers.HttpProvider(data.provider)
        )
        try {
            const contractInstance = new web3.eth.Contract(
                data.contractABI,
                data.contractAddress
            );
            var decimal = await contractInstance.methods.decimals().call()
            console.log("returnnewPromise  decimal:", decimal)
            await contractInstance.methods.balanceOf(data.address).call((error, receipt) => {
                if (error) {
                    reject(buildErrObject(422, error.message))
                    return;
                }
                else {
                    console.log(receipt, "res")
                    resolve(Number(receipt) / (10 ** Number(decimal)))
                    // resolve(receipt)
                }
            })
        } catch (error) {
            reject(buildErrObject(422, error.message))
        }
    })
}
module.exports = { getBalance }
