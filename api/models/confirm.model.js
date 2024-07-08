import mongoose from 'mongoose';
const { Schema } = mongoose;

const confirmSchema = new Schema({
    SellerId:{
        type:String,
        require:true
      },
   Sellername:{
        type:String,
        require:true
      },
      buyerId:{
        type:String,
        require:true
      },
   buyername:{
        type:String,
        require:true
      }, 
      numberofrevion:{
        type:String,
        require:true
      },
      status:{
        type:String,
        require:true
      },
      contract:{
        type:String,
        require:true

      },
      link:{
        type:String,
        require:true

      },
     
      
    },{
    timestamps:true
    });
    
export default mongoose.model("Confirm",confirmSchema)