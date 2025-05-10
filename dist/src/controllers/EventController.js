"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.getEventByAddress = exports.eventDetails = exports.createEvent = void 0;
const event_1 = __importDefault(require("../models/event"));
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, date, location, createdBy, minted_tokens, qr_url, keypair, mint } = req.body;
        const event = new event_1.default({
            name,
            description,
            date,
            location,
            createdBy,
            minted_tokens,
            mint,
            qr_url,
            eventKeypair: {
                publicKey: keypair.publicKey,
                secretKey: keypair.secretKey
            }
        });
        yield event.save();
        res.status(201).json(event);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ status: "fail", message: error.message });
    }
});
exports.createEvent = createEvent;
const eventDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield event_1.default.findById(eventId);
        if (!event) {
            res.status(404).json({ status: "fail", message: "Event not found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
});
exports.eventDetails = eventDetails;
const getEventByAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.params.address;
        const events = yield event_1.default.find({ createdBy: address });
        if (!events) {
            res.status(404).json({ status: "fail", message: "Events not found" });
        }
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
});
exports.getEventByAddress = getEventByAddress;
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const { name, description, date, location, createdBy, mint, minted_tokens, qr_url } = req.body;
        const event = yield event_1.default.findByIdAndUpdate(eventId, {
            name,
            description,
            date,
            location,
            createdBy,
            mint,
            minted_tokens,
            qr_url
        }, { new: true });
        if (!event) {
            res.status(404).json({ status: "fail", message: "Event not found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
});
exports.updateEvent = updateEvent;
