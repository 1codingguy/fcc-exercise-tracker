const getUsername = async (req, res) => {
  try {
    const { _id: userId } = req.params
    const user = await User.find({ _id: userId })
    if (user.length === 0) return res.status(404).send('userId not found')
    return { username: user[0].username, userId }
  } catch (error) {
    res.status(500).json(error)
  }
}

const convertDate = dateString => {
  return new Date(dateString).toDateString()
}

const createLogArray = (array, limit) => {
  const logArray = array.map(item => {
    const { description, duration } = item
    const date = convertDate(item.date)
    return { description, duration, date }
  })
  return limit ? logArray.slice(0, limit) : logArray
}

module.exports = {
  getUsername,
  convertDate,
  createLogArray,
}