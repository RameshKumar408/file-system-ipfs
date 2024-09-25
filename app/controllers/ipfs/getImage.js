const { handleError } = require('../../middleware/utils')
const crypto = require('crypto')
const { ObjectManager } = require('@filebase/sdk')
const files = require('../../models/files')
const axios = require('axios')

// Function to encrypt the image buffer
function decryptBuffer(encryptedData, ivHex, password) {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        crypto.scryptSync(password, 'salt', 32),
        Buffer.from(ivHex, 'hex')
    );

    let decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, 'hex')),
        decipher.final()
    ]);
    return decrypted;
}

const objectManager = new ObjectManager("8E71969980BE308317E8", "WkhCHJZ7gKWiH0JDrpD9LGNTKdwmyQlFsk9jO1uP", {
    bucket: "testsrkbucket"
});

const getImage = async (req, res) => {
    try {
        const password = 'ramesh123'; // Replace with your secure password

        // console.log("🚀  decodeBase64  decryptedData:", decryptedData)
        // const base64Image = decryptedData.toString('base64');
        const fileList = await files.find({})
        var ress = []

        for (let i = 0; i < fileList.length; i++) {
            const element = fileList[i];
            const { data } = await axios.get(element.url)
            const decryptedData = decryptBuffer(data?.encryptedImage?.encryptedData, data?.encryptedImage?.iv, password);
            const base64Image = decryptedData.toString('base64');
            var dtss = {
                name: element.name,
                image: `data:${data.mimetype};base64,${base64Image}`
            }
            ress.push(dtss)
        }
        res.status(200).json({
            success: true,
            result: ress,
            message: 'Files List'
        })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getImage }