exports.adminLogout = (req, res) => {
    res.clearCookie('admin');
    res.status(200).json({ message: 'Logout successful' });
};

exports.studentLogout = (req, res) => {
    res.clearCookie('student');
    res.status(200).json({ message: 'Logout successful' });
};
