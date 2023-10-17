const { createProjectService, getProject, deleteProjectService
, putUpdateProjectService } = require('../services/productService')

module.exports = {
    postCreateProject: async (req, res) => {
        let result = await createProjectService(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getAllProject: async (req, res) => {
        let result = await getProject(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    },
    deleteAProject: async (req, res) => {
        let result = await deleteProjectService(req.body.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    putUpdateProject: async (req, res) => {
        let result = await putUpdateProjectService(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}