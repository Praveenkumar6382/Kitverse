import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim :true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
    },
    password:{
       type:String,
      required:true,
      minlength:8,
    },
    role:{
      type:String,
      enum:['user','admin'],
      default:'user'
    }

  }
);

const userModel = mongoose.models.user || mongoose.model("User",userSchema);
export default userModel;