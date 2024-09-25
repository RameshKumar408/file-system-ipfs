/* eslint-disable max-statements */
const { handleError } = require('../../middleware/utils')
const crypto = require('crypto')
const { ObjectManager } = require('@filebase/sdk')
const files = require('../../models/files')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// Function to encrypt the image buffer
function encryptBuffer(buffer, password) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const key = crypto.scryptSync(password, 'salt', 32); // Derive key from password

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

const objectManager = new ObjectManager("8E71969980BE308317E8", "WkhCHJZ7gKWiH0JDrpD9LGNTKdwmyQlFsk9jO1uP", {
    bucket: "testsrkbucket"
});


const uploadImage = async (req, res) => {
    try {
        if (req.file) {
            // const base64Image = req.file.buffer.toString('base64');
            // res.send(`data:${req.file.mimetype};base64,${base64Image}`);

            const password = 'ramesh123'; // Replace with your secure password
            const encryptedImage = encryptBuffer(req.file.buffer, password);
            var payload = {
                name: req.body.name + "." + req.file.mimetype.split("/")[1],
                mimetype: req.file.mimetype,
                encryptedImage: encryptedImage
            }

            const uploadedObject = await objectManager.upload(
                payload.name,
                Buffer.from(JSON.stringify(payload))
            );

            await files.create({
                name: req.body.name + "." + req.file.mimetype.split("/")[1],
                url: "https://ipfs.filebase.io/ipfs/" + uploadedObject?.cid
            })
            res.status(200).json({
                success: true,
                result: null,
                message: 'IMAGE UPLOADED SUCCESSFULLY'
            })
        } else {
            res.status(400).json({
                success: false,
                result: null,
                message: 'SOMETHING WENT WRONG'
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { uploadImage }
