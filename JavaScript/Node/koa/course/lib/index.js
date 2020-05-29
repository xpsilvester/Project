const Course = require('./model/course')

//获取课程列表
async function getCourseList() {
  return await Course.find().sort({
    'startTime': 1
  })
}

//通过id获取课程
async function getCourseById(id) {
  return await Course.findById(id)
}

//获取在时间范围内的课程
async function getCourseByTime(start, end, weekday) {
  return await Course.find({
      weekday: weekday
    }).where('startTime').gte(start)
    .where('endTime').lte(end)
}

//添加课程
async function addCourse(course) {
  //console.log(course)
  const {
    name,
    weekday,
    startTime,
    endTime
  } = course
  const item = await getCourseByTime(startTime, endTime, weekday)
  //console.log(item)
  if (item.length > 0) {
    throw new Error('当前时间段已经安排了课程')
  }
  return await Course.create(course)
}

//更新课程
async function updateCourse(id, course) {
  return await Course.update({
    _id: id
  }, course)
}

//删除课程
async function removeCourse(id) {
  return await Course.remove({
    _id: id
  })
}

module.exports = {
  getCourseList,
  getCourseById,
  getCourseByTime,
  addCourse,
  updateCourse,
  removeCourse
}