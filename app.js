const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js")

const app = express();

const items = ["Be a cool person", "Be kind"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/Work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/Work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.get("/about", function (req, res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("Server started on Port 3000.");
});