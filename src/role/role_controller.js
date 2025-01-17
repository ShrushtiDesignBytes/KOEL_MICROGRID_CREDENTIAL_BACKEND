var db = require('../../config/db');
const Sequelize = db.sequelize
const Role = db.role;

module.exports = {

    //get all role
    getRole: async (req, res) => {
        try {
            const role = await Role.findAll();
            return res.status(200).send(
                role
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add role
    createRole: async (req, res) => {
        const { role } = req.body
        try {
            const roles = await Role.create({ role });
            return res.status(200).json(
                roles
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

}