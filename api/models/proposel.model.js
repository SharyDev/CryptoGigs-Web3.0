import mongoose from 'mongoose';
const { Schema } = mongoose;

const proposelSchema = new Schema({
    SellerId:{
        type:String,
        require:true
      },
   Sellername:{
        type:String,
        require:true
      },
    Selleradress:{
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
      title:{
        type:String,
        require:true
      },
      desc:{
        type:String,
        require:true
      },
    
     
      cat:{
        type:String,
        require:true
      },
      price:{
        type:String,
        require:true
      },
      deliveryTime:{
        type:Number,
        require:true
      },
      rivisonNumbers:{
        type:Number,
        require:true
      },
      features:{
        type:[String],
        require:false
      },
    },{
    timestamps:true
    });
    
export default mongoose.model("Proposel",proposelSchema)