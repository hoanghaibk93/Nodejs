const connection = require('../config/database');


const getAllUsers = async () => {
    const [results, fields] = await (await connection).query(
        'select * from Users'
    )
    return results;
}

const getUserById = async (userId) => {
    const [results, fields] = await (await connection).execute(
        `select * from Users where id = ?`, [userId]);
    let user = results && results.length > 0 ? results[0] : {}
    return user
}
const updateUserById = async (email, myname, city, userId) => {
    let [results, fields] = await (await connection).execute(
        `update Users
        set email = ?, city = ?, name = ?
        where id = ?`,
        [email, myname, city, userId]
    );
}
const deleteUserById = async (userId) => {
    let [results, fields] = await (await connection).execute(
        'delete from Users where id = ?', [userId]
      )
}
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}