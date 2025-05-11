import { NextFunction, Request, Response } from "express";
import Event from "../models/event";

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, description, date, location, createdBy, minted_tokens, qr_url, keypair, mint } = req.body;
        const event = new Event({
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
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "fail", message: error });
    }
}

export const eventDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ status: "fail", message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ status: "fail", message: error });
    }
}


export const getEventByAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const address = req.params.address;  
        const events = await Event.find({ createdBy: address });
        if (!events) {
           res.status(404).json({ status: "fail", message: "Events not found" });
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ status: "fail", message: error });
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const eventId = req.params.id;
        const { name, description, date, location, createdBy, mint, minted_tokens, qr_url } = req.body;
        const event = await Event.findByIdAndUpdate(eventId, {
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
    } catch (error) {
        res.status(500).json({ status: "fail", message: error });
    }
}