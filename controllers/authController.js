const User = require('../model/Users')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd) return res.status(400).json({ 'Message': 'Fill username or password' })
  const foundUser = await User.findOne({ username: user }).exec()
  if (!foundUser) return res.status(401) // unauthorized
  //evaluate pwd
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    //grab the role
    const roles = Object.values(foundUser.roles)

    //create jwt
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = refreshToken
    await foundUser.save()
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}
module.exports = { handleLogin }
