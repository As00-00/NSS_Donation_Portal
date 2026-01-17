import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, 
      default: "Anonymous"
    },
    email: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  { timestamps: true }
);


export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);