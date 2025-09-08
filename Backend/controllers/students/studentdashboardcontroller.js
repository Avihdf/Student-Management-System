const User = require('../../Models/user')

exports.getStudentData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({ user: req.user });
    } catch (error) {
        console.error('Get student data error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}