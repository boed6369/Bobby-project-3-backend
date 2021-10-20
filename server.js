
// DEPENDENCIES

require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000,MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// importing mongoose 
const mongoose = require("mongoose")
// middleware
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// models
const factionSchema =  new mongoose.Schema({
    oFactionName:String,
    oFactionRelic:String,
    oFactionWarlord:String,
    oFactionAbilites: String,
    oFactionLore:String,

    fFactionName:String,
    fFactionRelic:String,
    fFactionWarlord:String,
    fFactionAbilites: String,
    fFactionLore:String,

    sFactionName:String,
    sFactionRelic:String,
    sFactionWarlord:String,
    sFactionAbilites: String,
    sFactionLore:String 
})

const Faction = mongoose.model("Faction", factionSchema)
// middleware
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 
// DATABASE CONNECTION

// ROUTES
app.get("/", (req, res) => {
    res.send("hello world");
});

// index route 
app.get("/faction", async (req, res) => {
    try {
        // send all people
        res.json(await Faction.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// create route 
app.post("/faction", async (req, res) => {
    try {
        // send all people
        res.json(await Faction.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// PEOPLE DELETE ROUTE
app.delete("/faction/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Faction.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE UPDATE ROUTE
  app.put("/faction/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await Faction.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));