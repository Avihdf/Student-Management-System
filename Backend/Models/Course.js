    const mongoose=require('mongoose');
    const courseSchema=new mongoose.Schema({

        name:{ type:String, required:true },
        description:{ type:String, required:true },
        duration:{ type:String, required:true },
        price:{ type:Number, required:true },
        thumbnail:{ type:String},
        active: { type: Boolean, default: false },
        
    },{ timestamps:true });
    module.exports=mongoose.model('Course',courseSchema);