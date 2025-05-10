import { Router } from "express";

const router = Router();
import { createEvent, eventDetails, getEventByAddress, updateEvent } from "../controllers/EventController";

router.post("/create", createEvent);
router.get("/address/:address", getEventByAddress);
router.get("/details/:id", eventDetails);
router.put("/update/:id", updateEvent); 

export default router;