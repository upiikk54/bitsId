const express = require("express");
const app = express();
const PORT = 8987;
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
app.get("/api/checklist/:id/item", middlewares.authenticate, itemChecklistController.getItemChecklist);
app.get("/api/checklist/:id/item/:itemid", middlewares.authenticate, itemChecklistController.getItemChecklistById);
app.put("/api/checklist/:id/item/:itemid", middlewares.authenticate, itemChecklistController.updateItemChecklist);
app.delete("/api/checklist/:id/item/:itemid", middlewares.authenticate, itemChecklistController.deleteItemChecklist);
app.put("/api/checklist/:id/item/rename/:itemid", middlewares.authenticate, itemChecklistController.updateItemChecklistName);

// ------------------- Listen Server ------------------- //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port ${process.env.URL}${process.env.PORT || PORT}`);
});

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
// });

// ------------------- End Listen Server ------------------- //