import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    province: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
    },
    country: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const AddressModel = mongoose.model("address", addressSchema);
export default AddressModel