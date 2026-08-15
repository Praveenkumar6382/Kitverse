import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    title:{
        type: String,
        required: true,
        unique:true
    },
    description:{

        type:String,
        required:true,
        
    },

    price:{
        type:Number,
        required:true,
        
    },

    quantity:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true   

    },
},
    {
    
        timestamps :true,
    }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product',productSchema);
export default ProductModel;