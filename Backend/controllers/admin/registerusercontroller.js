const User = require('../../Models/user');

exports.getAllregisterStudents = async (req, res) => {
    try {
        const user = await User.find({ role: 'student' });
        return res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.restrictUser = async (req, res) => {
  try {
    const { id } = req.params;


    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle restriction
    user.restricted = !user.restricted;
    await user.save();

    return res.status(200).json({
      message: `User ${user.restricted ? "restricted" : "unrestricted"} successfully`,
      user,
    });
  } catch (error) {
    console.error("Restrict user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Search students by name, email, or studentNumber
exports.searchStudentByNameEmailNumber = async (req, res) => {
  try {
    const { query } = req.query;
    

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const students = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },   // case-insensitive
        { email: { $regex: query, $options: "i" } },
        { number: { $regex: query, $options: "i" } }
      ]
    })

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.status(200).json({ students });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.deletestudent = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
