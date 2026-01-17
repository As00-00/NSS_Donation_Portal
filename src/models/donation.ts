import mongoose, { Schema, model, models } from "mongoose";

const DonationSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency:{
        type:String,
        default:"INR"
    },
    status: { 
      type: String, 
      enum: ["pending", "success", "failed"], 
      default: "pending"
    }, 
    transactionId: { type: String },
    paymentMethod: { type: String },
},
  
  { timestamps: true },

);


const Donation = models.Donation || model("Donation", DonationSchema);
export default Donation;