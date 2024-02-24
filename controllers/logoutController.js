const User = require('../model/Users')
const handleLogout = async (req, res) => {
  //for frontend, also delete the access token
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204);//no content

  const refreshToken = cookies.jwt

  // is refresh token in db
  const foundUser = await User.findOne({ refreshToken }).exec() // or{refreshToken:refreshToken}
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    return res.sendStatus(204) // no content
  }
  // delete the refresh token in db
  foundUser.refreshToken = ''
  await foundUser.save()

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.sendStatus(204)
}
module.exports = { handleLogout }
