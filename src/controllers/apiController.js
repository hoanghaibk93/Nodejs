
const User = require('../models/user')

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

module.exports = {
    getUsersApi,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI
}