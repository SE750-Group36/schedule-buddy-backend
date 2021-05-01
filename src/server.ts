require("dotenv").config();
import express from "express";
import routes from "./routes";
import mongoose from "mongoose";

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// Setup our routes.
app.use("/", routes);

if (process.env.MONGO_URI == null) {
    console.log("No connection string in environment variable");
} else {
    // Start the DB running. Then, once it's connected, start the server.
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() =>
            app.listen(port, () =>
                console.log(`App server listening on port ${port}!`)
            )
        );
}
