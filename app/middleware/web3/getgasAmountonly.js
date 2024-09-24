const Web3 = require('web3')
const { buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const model = require('../../models/address')
const { response } = require('express')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PRIMAL_RPC))
const datas = {}

const getGasAmounts = async (req, res, next) => {
  const user = req.user


  const data = await model.find({ Daddress: user.wadress })
  if (data) {
    const fromAddress = data[0]?.address

    const gasAmount = web3.eth.estimateGas(
      {
        to: req.body.toAddress,
        from: fromAddress,
        value: web3.utils.toWei(`${req.body.amount}`, 'ether')
      },
      async (error, receipt) => {
        if (error) {
          reject(buildErrObject(422, error.message))
          return
        } else {
            
          if (req.body.type == 'low') {
              
              const a= await web3.utils.fromWei((receipt*1).toString(),'gwei')
              req.baseFee = a
              
            return next()
          } else if (req.body.type == 'medium') {
            
            const a= await web3.utils.fromWei((receipt*1.5).toString(),'gwei')
            req.baseFee = a
            
          return next()
          } else if (req.body.type == 'aggressive') {
            const a= await web3.utils.fromWei((receipt*2).toString(),'gwei')
            req.baseFee = a
          return next()
          }
          else {
            return res.status(404).json({
              success: false,
              result: null,
              message: 'Invlaid type'
            })
          }
        }
      }
    )
  } else {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Data not found'
    })
  }
}

module.exports = { getGasAmounts }
