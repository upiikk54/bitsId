const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// ------------------- Import Controller ------------------- //

const authController = require("./controllers/authController");
const checklistController = require("./controllers/checklistController");
const itemChecklistController = require("./controllers/itemChecklistController");

// ------------------- End Import Controller ------------------- //

// ------------------- Import Middleware ------------------- //

const middlewares = require("./middlewares/auth");

// ------------------- End Import Middleware ------------------- //


// ------------------- Define Routes Auth ------------------- //

app.post("/api/register", authController.handleRegister);
app.post("/api/login", authController.handleLogin);

// ------------------- End Define Routes Auth ------------------- //


// ------------------- Define Routes Checklist ------------------- //

app.post("/api/checklist", middlewares.authenticate, checklistController.createChecklist);
app.delete("/api/checklist/:id", middlewares.authenticate, checklistController.deleteChecklist);
app.get("/api/checklist", middlewares.authenticate, checklistController.getChecklist);

// ------------------- End Define Routes Checklist ------------------- //

// ------------------- Define Routes Item Checklist ------------------- //
app.post("/api/checklist/:id/item", middlewares.authenticate, itemChecklistController.createItemChecklist);
// app.delete("/api/checklist/:id/item", middlewares.authenticate, itemChecklistController.deleteItemChecklist);
app.get("/api/checklist/:id/item", middlewares.authenticate, itemChecklistController.getItemChecklist);

// ------------------- Listen Server ------------------- //

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server berhasil berjalan di port 94.74.86.174:${process.env.PORT || PORT}`);
// });

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});

// ------------------- End Listen Server ------------------- //