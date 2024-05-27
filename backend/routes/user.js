import {Router, express} from "express"
import {zod } from "zod"
const app = express()
import {User} from "../db"
const router = express.Router()
import {jwt} from "json-web-token"
import { JWT_SECRET } from "../config"
import {authMiddleware} from "../middlewares/authMiddleware"
import {BankAcc} from "../db"

const inputSchema = {
    username : zod.String().email() , 
    password : zod.String().min(5) , 
    firstName : zod.String() ,
    lastName : zod.String() , 
}

router.post("/signup" , async (req , res , next )=>{
    const {success} =  inputSchema.safeParse(req.body)

    if(!success){
        res.status(411).send("Wrong Inputs")
    }
    
    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(!existingUser){
        res.status(411).send("User already exists")
    }


    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const user_ID = user._ID


    await 

    const token = jwt.sign({user_ID}, JWT_SECRET)
    
    res.json({
        message: "User created successfully",
        token: token
    })
})



Router.post("/signin" , async ( req , res  )=>{
    const {success} = inputSchema.safeParse(
       {
        username : req.body.username , 
        password : req.body.password
       }
    )

    if(!success){
        res.status(411).send("Wrong Inputs")
    }

    const userFound = User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(userFound){
        const token = jwt.sign({
            userId : user._ID
        } , JWT_SECRET)
    }

    res.json({
        msg : token
    })

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateSchema = {
    password : zod.String.min(5),
    firstName : zod.String() ,
    lastName : zod.String() , 
    
}

Router.put("/user/update" , authMiddleware ,   (req , res , next)=>{
    const {success} = updateSchema.safeParse(req.body)
    if(!success){
        res.status(411).send({
            msg : "Error"
        })
    }

    const updatedUser = User.updateOne({_id : req.userId} , req.body)
    if(!updatedUser){
        res.status(411).send({
            msg : "Error"
        })
    }
})



module.exports = {
    Router
}