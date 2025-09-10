const Course=require('../../Models/Course')

exports.addCourse = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    // If file uploaded, Cloudinary URL is available in req.file.path
    const thumbnail = req.file ? req.file.path : null;

    const newCourse = new Course({
      name,
      description,
      duration,
      price, 
      thumbnail,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
