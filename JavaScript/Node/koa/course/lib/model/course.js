const mongoose = require('../conn').mongoose

const courseSchema = new mongoose.Schema({
  name: String,
  startTime: Number,
  endTime: Number,
  weekday: {
    type: Number,
    max: 6,
    min: 0
  }
})

const Course = mongoose.model('course', courseSchema)
module.exports = Course
