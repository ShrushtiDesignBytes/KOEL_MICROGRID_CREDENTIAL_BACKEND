var db = require('../../config/db');
const Sequelize = db.sequelize
const Sites = db.sites;

module.exports = {

    //get all site
    getSite: async (req, res) => {
        try {
            const site = await Sites.findAll();
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
    createSite: async (req, res) => {
        const { siteName, siteURL } = req.body
        try {
            const site = await Sites.create({ siteName, siteURL });
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