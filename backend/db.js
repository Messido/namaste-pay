import {mongoose} from mongoose

mongoose.connect('mongodb+srv://siddhant1jagati:Zpc62vrIKvQM2W73@cluster0.irzheor.mongodb.net/')


const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type : String, 
        minLength : 3 , 
        maxLength : 20 , 
        unique : true , 
        trim : true 
    } , 
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})


const User = mongoose.model("User" , userSchema)



const bankSchema = new Schema({
    userId : {
        type :  mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : "User"
    } , 
    balance : {
        type : Number , 
        required : true  
    }
})

const BankAcc = mongoose.model("BankAcc" , bankSchema)

module.exports = {
    User , BankAcc
}