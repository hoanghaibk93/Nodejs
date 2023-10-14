const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService')
const getHomePage = async (req, res) => {
  let results = await getAllUsers()
  return res.render('home.ejs', { listUser: results })
}

const getHoi = (req, res) => {
  res.render('sample.ejs')
}
const postCreateUser = async (req, res) => {
  // let email = req.body.email;
  // let name = req.body.myname;
  // let city = req.body.city;
  let { email, myname, city } = req.body;

  let [results, fields] = await (await connection).execute(
    `insert into Users (email, name, city)
    values (?, ?, ?)`,
    [email, myname, city]
  );
  res.redirect('/')

}
const getCreatePage = (req, res) => {
  res.render('create')
}

const getUpdatePage = async (req, res) => {
  const userId = req.params.id
  let user = await getUserById(userId)

  res.render('update.ejs', { userEdit: user })
}


const postUpdateUser = async (req, res) => {

  let { userId, email, myname, city } = req.body;
  await updateUserById(email, myname, city, userId)
  res.redirect('/')
}
const postDeleteUser = async (req, res) => {
  const userId = req.params.id
  let user = await getUserById(userId)
  res.render('delete.ejs', { userEdit: user })
}
const postHandleRemoveUser = async (req, res) => {
  const userId = req.body.userId
  await deleteUserById(userId);
  res.redirect('/')
}
module.exports = {
  getHomePage,
  getHoi,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,

}