const courses = require('../../Models/Course');

exports.getCourseList = async (req, res) => {
  try {
    const courseList = await courses.find();
    res.status(200).json({ courses: courseList });
  } catch (error) {
    console.error("Error fetching course list:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courses.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.activeDeactiveCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courses.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.active = !course.active;
    await course.save();
    res.status(200).json({ message: `Course ${course.active ? "activated" : "deactivated"} successfully`, course });
  } catch (error) {
    console.error("Error toggling course active status:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    const updatedCourse = await courses.findByIdAndUpdate(id, { name, description, duration, price, thumbnail }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

