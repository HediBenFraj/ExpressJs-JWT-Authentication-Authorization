const _ = require('lodash')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router() //importing router from express 
let User = require('../models/user.model') // importing the User model from user.model


router.route('/').post(async(req,res) => {     // This is a get request that allows to have all the users 
    
    let user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token = jwt.sign({ _id : user._id,isAdmin : user.isAdmin},config.get('jwtPrivateKey'))
    const userReponse = _.pick(user, ['_id','fullName','email','phoneNumber','isAdmin'])

    res.send({...userReponse ,token})
})

// router.route('/add').post(async(req,res)=>  {          // same thing as the other request we're just mentionin  the route 'add'
    


//     const newUser = new User(_.pick(req.body,['fullName','email','password','phoneNumber']))         // creating an instance of User with the username variable

//     const salt = await bcrypt.genSalt(10)
//     newUser.password = await bcrypt.hash(newUser.password,salt)


//     newUser.save()                               // newUser.save() commirs the changes or saves the changes to the database
//         .then(()=> res.send(_.pick(newUser, ['_id','fullName','email','password'])))
//         .catch(err => res.status(400).json('Error'+err))
// })

// router.route('/:id').get((req,res)=> {              // by putting :id we're mtntionig that there will be a variable in the url named id
//     User.findById(req.params.id)                    //we can find it in req.params.id and we use find by id which will return the element with th same id if found
//         .then(user => res.json(user))               //if the request gets accepted we show the result which is the appropriate user
//         .catch(err => res.status(400).json("Error :"+err))
// })

// router.route('/:id').delete((req,res) => {     // we're using the delete request now 
//     User.findByIdAndDelete(req.params.id)       //findByIdAndDelete does what it's named for it deletes the element with the appropriate id if found
//         .then(()=> res.json('User deleted'))            //shows message User deleted if everything is okay
//         .catch(err => res.status(400).json("Error : "+err))
// })

// router.route('/update/:id').post((req,res)=> {    // we specified the update/:id  route and used a post request
//     User.findById(req.params.id)            
//         .then(user => {
//             user.username = req.body.username       //we're updating the content of the user

//             user.save()                             // then commiting changes with user.save()
//                 .then(()=> res.json('User Updated'))
//                 .catch(err => res.status(400).json("Error : "+err))
//         })
//         .catch(err => res.status(400).json('Error : ' +err))
// })

module.exports = router                 //this is neeceassry i don't know why