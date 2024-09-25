const mongoose = require('mongoose')
const validator = require('validator')

const FilesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('files', FilesSchema)
