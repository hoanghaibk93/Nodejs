
const User = require('../models/user')
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const getUsersApi = async (req, res) => {
    let results = await User.find({})
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    let { email, myname, city } = req.body;

    let user = await User.create({
        email: email,
        name: myname,
        city: city
    })

    return res.status(200).json({
        errorCode: 0,
        data: user
    })

}

const putUpdateUserAPI = async (req, res) => {

    let { userId, email, myname, city } = req.body;
    // await updateUserById(email, myname, city, userId)
    let user = await User.updateOne({ _id: userId }, { name: myname, email: email, city: city })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}

const deleteUserAPI = async (req, res) => {
    const userId = req.body.userId
    // await deleteUserById(userId);
    let user = await User.deleteOne({ _id: userId })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}

const postUploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image);
    console.log("check result: ", result);

    return res.status(200).json({
        EC: 0,
        data: result
    })
}

const postUploadMultipleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    } else {
        return await postUploadSingleFileApi(req, res)
    }
}

module.exports = {
    getUsersApi,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileApi,
    postUploadMultipleFileApi
}