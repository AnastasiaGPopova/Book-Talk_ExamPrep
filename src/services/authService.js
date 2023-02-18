const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')


exports.getUserByUsername =  (username) => User.findOne({username})
exports.getUserByEmail =  (email) => User.findOne({email})

exports.register = async (email, username, password) => {

   const newUser = await User.create({email, username, password})

   const payLoad = {_id: newUser._id, email: newUser.email, username: newUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token

} 

exports.login = async (existingUser, password) => {
   const isValid = await existingUser.validatePassword(password)

   if(!isValid){
      throw new Error("Invalid username or password!")
   }
  
   const payLoad = {_id: existingUser._id, email: existingUser.email, username: existingUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}
