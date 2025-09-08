const User=require('../../Models/user');

exports.getAdminData = async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

       
        res.status(200).json({ admin: req.admin });
    } catch (error) {
        console.error('Get admin data error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
