var db = require('../../config/db');
const Sequelize = db.sequelize
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;
const Role = db.role;
const Site = db.sites;

const generateToken = (user, deviceId) => {
    const siteName = user.sites.map(site => site.siteName);
    const siteURLs = user.sites.map(site => site.siteURL);
    console.log(siteName, siteURLs)
    return jwt.sign({ id: user.id, role: user.role, siteURL: siteURLs, siteName: siteName, deviceId: deviceId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {

    //get all site
    getUser: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).send(
                users
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add user
    createUser: async (req, res) => {
        const { email, password, roleName, siteName } = req.body
        try {

            const emails = await User.findOne({where: {email: email}})
            if(emails) return res.status(404).json({ message: 'Email already exists' })

            const roles = await Role.findOne({ where: { role: roleName } });
            if (!roles) return res.status(404).json({ message: 'Role not found' });

            let sites;
            if (roleName === 'Super-Admin') {
                const sitess = await Site.findAll({ attributes: ['id'] });
                const siteIds = sitess.map(site => site.id);

                sites = siteIds.sort();
            }

            if (siteName) {
                const site = await Site.findOne({ where: { siteName: siteName } });
                if (!site) return res.status(404).json({ message: 'Site not found' });

                sites = site.id
            }

            const users = await User.create({
                email,
                password,
                roleId: roles.id,
            });

            await users.addSites(sites);

            return res.status(200).json(
                users
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //login
    loginUser: async (req, res) => {
        const { email, password, deviceId } = req.body;
        
        try {

            const user = await User.findOne({ where: { email: email }, include: [{
                model: Site,
                attributes: ['siteName','siteURL'], // Fetch only siteURL
                through: { attributes: [] } // Exclude join table attributes
            }, { model: Role, attributes: ['role'] }], });


            if (!user) {
                return res.status(401).json({ message: 'Please Registerd your Email' });
            }

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            console.log(user.toJSON())

            const token = generateToken(user, deviceId);

            return res.status(200).json({
                message: 'Login Successfully',
                id: user.id,
                token: token,
                URL: user.sites,
                Role: user.role.role
            });
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    userRedirect: async (req, res) => {
        try {
            const siteURLs = req.user.siteURL; 
            res.send(siteURLs);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

}