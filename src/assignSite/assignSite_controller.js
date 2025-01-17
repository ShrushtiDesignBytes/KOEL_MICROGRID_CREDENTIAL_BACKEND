var db = require('../../config/db');
const Sequelize = db.sequelize
const AssignSite = db.assignSite;

module.exports = {

    //get all site
    getAssignSite: async (req, res) => {
        const id = req.params.id
        try {
            const site = await AssignSite.findOne({where: {userId: id}});
            return res.status(200).send(
                site
        );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add site
    createAssignSite: async (req, res) => {
        const { overview, solar, wind, genset, ess, mains, biogas, alert } = req.body
        const id = req.params.id;
        console.log(id)
        try {
            const site = await AssignSite.create({ overview, solar, wind, genset, ess, mains, biogas, alert, userId: id });
            return res.status(200).json(
                site
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

}