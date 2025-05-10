import express from "express";

const app = express();
import mongoose from "mongoose";    
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./src/routes/eventRoutes";
import morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log("Connected to MongoDB");
}
).catch((error) => {    
    console.error("Error connecting to MongoDB:", error);
});



app.use("/api/v1/event", eventRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}   );
