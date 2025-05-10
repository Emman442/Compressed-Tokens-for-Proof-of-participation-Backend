import mongoose from 'mongoose';


const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    minted_tokens: {
        type: Number,
        default: 0,
    },
    claimed_tokens: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
    },
    qr_url: {
        type: String,
    },
    mint: {
        type: String,
    },
    eventKeypair: {
        publicKey: String,
        secretKey: String, 
    },
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
export default Event;