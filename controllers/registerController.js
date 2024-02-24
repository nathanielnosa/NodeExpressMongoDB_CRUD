const User = require('../model/Users')

const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  //destructure the username n password 
  const { user, pwd } = req.body
  // check if it's empty
  if (!user || !pwd) return res.status(400).json({ "Message": "Username and Password required" })

  //check if there is duplicate
  const duplicate = await User.findOne({ username: user }).exec()
  if (duplicate) return res.sendStatus(409) //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newUser = await User.create({
      "username": user,
      "password": hashedPwd
    });
    console.log(newUser);
    res.status(200).json({ "Success": `Register ${user} successful` })
  } catch (error) {
    res.status(500).json({ "Message": error.message })
  }

}

module.exports = { handleNewUser }
