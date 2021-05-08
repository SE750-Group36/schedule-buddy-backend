import mongoose from 'mongoose';
import express from 'express';
import routes from "../../../routes";
require("dotenv").config();

let app, server;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {
    // Setup Express
    const app = express();
    const port = process.env.PORT || 3001;

    // Setup body-parser
    const bodyParser = require("body-parser");

    // Allow CORS
    const cors = require("cors");
    app.use(cors());

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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
                    console.log(`App server listening on port ${port}!`),
                ),
            );
    }
    

});


it('Basic Jest True Test', async () => {

    var response = await fetch('http://localhost:3001/api/calendar/', {method: 'GET', headers: {user:'608cbbadebda930016288b5c'}});
    var body = await response.json();

    console.log(body);

    
    expect(true);
})