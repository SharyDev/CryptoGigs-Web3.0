import mongoose from 'mongoose';
const { Schema } = mongoose;

const updateSchema = new Schema({
    link:{
        type:String,
        require:true
      },
    desc:{
      type:String,
        require:true
    },
 
     
      
    },{
    timestamps:true
    });
    
export default mongoose.model("Update",updateSchema)