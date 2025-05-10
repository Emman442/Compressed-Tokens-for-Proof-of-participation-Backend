"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
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
const Event = mongoose_1.default.model('Event', EventSchema);
exports.default = Event;
