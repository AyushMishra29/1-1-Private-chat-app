const mongoose = require('mongoose');
const userModel = require('../models/userModel')


//Creating a validation function
const isValid = function (value) {
  if (typeof (value) === undefined || typeof (value) === null) return false 
  if (typeof (value) === "string" && (value).trim().length > 0)  return true 
}

//Checking that title can be only Mr , Miss and Mrs
const isValidTitle = function (type){
  return  ["consumer" , "support"].indexOf(type) !== -1
}

//Creating a validation function for Object Id
const isValidObjectId = function (objectId){
  return mongoose.Types.ObjectId.isValid(objectId)
}

const onCreateUser = async (req, res) => {
  try {
    //Checking if no data is present in our request body
    let data = req.body
    if (Object.keys(data) == 0) {
    return res.status(400).send({ status: false, message: "Please enter your details to register" })
    }

    //Checking if user has entered these mandatory fields or not
    const { firstName , lastName , type } = data

    if (!isValid(firstName)) {
         return res.status(400).send({ status: false, message: "First name is required" })
         }  
    if (!isValid(lastName)) {
         return res.status(400).send({ status: false, message: "Last name is required" })
         }       
    if (!isValid(type)) { 
        return res.status(400).send({ status: false, message: "Type is required" }) 
         }
    if (!isValidTitle(type)) { 
      return res.status(400).send({ status: false, message: "Type should be among consumer or support" }) 
         }
    
    //If all these validations passed , registering a user
    let UserData = await userModel.create(data)
    return res.status(201).send({status: true , message: "You're registered successfully", data: UserData })

}
//Exceptional error handling
catch (error) {
    console.log(error)
    return res.status(500).send({status: false , message: error.message })
}
}



const onGetUserById = async (req, res) => { 

try {
    let user_Id = req.params.userId

    //Checking if userId is a valid type Object Id or not
    if (!isValidObjectId(user_Id)){
        return res.status(400).send({status: false , message: `${user_Id} is not valid type user Id`})
        }

    //Validate: The userId is valid or not.
    let User = await userModel.findById(user_Id)
    if (!User) {
    return res.status(404).send({ status: false, message: "User does not exists" })
    }
   
   //Sending the response in the required format
   return res.status(200).send({status: true, data: User})

}

//Exceptional error handling
catch (error) {
    console.log(error)
    return res.status(500).send({status: false , message: error.message })
}
}
    
   
const onGetAllUsers = async (req, res) => { 
try {
    const users = await userModel.find();
    return res.status(200).send({ success: true, data: users });
} 
catch (error) {
    console.log(error)
    return res.status(500).send({status: false , message: error.message })
}
}
    
const onDeleteUserById = async (req, res) => { 
  try {
    let user_Id = req.params.userId

    //Checking if userId is a valid type Object Id or not
    if (!isValidObjectId(user_Id)){
        return res.status(400).send({status: false , message: `${user_Id} is not valid type user Id`})
        }

    //Validate: The userId is valid or not.
    let User = await userModel.deleteOne({ _id: user_Id})
   
   //Sending the response in the required format
   return res.status(200).send({status: true, message: `Deleted a user with userId ${user_Id}`})

}

//Exceptional error handling
catch (error) {
    console.log(error)
    return res.status(500).send({status: false , message: error.message })
}
}

module.exports = {
  onCreateUser,
  onGetUserById,
  onGetAllUsers,
  onDeleteUserById
}
  