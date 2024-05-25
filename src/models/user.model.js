import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//  schema for youtube user
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,   //cloudnary url
        required:true,
    },
    coverImage:{    
        type:String
    },
    watcHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    },


},
{timestamps:true}
)


//  bcrypt is use for hash algorithm yo secure our password or encrypt it
userSchema.pre("save",async function (next){
    if(this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
)
}

//both the token method are same for calling but both token expiry are diff

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}
)
}


export const User=mongoose.model("User",userSchema)