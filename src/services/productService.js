const Project = require('../models/project')
const aqp = require('api-query-params');

const createProjectService = async (data) => {
    try {
        if (data.type === 'Empty project') {
            let result = await Project.create(data);
            return result;
        }
        if (data.type === "ADD-USERS") {
            console.log("check", data);
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i]);
            }
            let newResult = await myProject.save();
            return newResult;
        }
        if (data.type === "REMOVE-USERS") {
            let myProject = await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.pull(data.usersArr[i]);
            }
            let newResult = await myProject.save();
            return newResult;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getProject = async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    console.log("checking:", aqp(queryString));
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Project.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();
    return result
}
const deleteProjectService = async (id) => {
    try {
        let result = await Project.deleteById(id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
const putUpdateProjectService = async (data) => {
    try {
        let result = await Project.updateOne({ _id: data._id }, data)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createProjectService,
    getProject,
    deleteProjectService,
    putUpdateProjectService
}