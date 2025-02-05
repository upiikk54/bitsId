const itemChecklistService = require("../services/itemChecklistService");

// ------------------------- Create item checklist ------------------------- //
const createItemChecklist = async (req, res) => {
    const {
        itemName,
    } = req.body;

    const {
        id } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
        await itemChecklistService.createItemChecklist({
            user_id,
            itemName,
            checklist_id: id,
        });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Create item checklist ------------------------- //

// ------------------------- get item checklist ------------------------- //
const getItemChecklist = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await itemChecklistService.getItemChecklist({
        checklist_id: id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End item checklist ------------------------- //

module.exports = {
    createItemChecklist,
    getItemChecklist
}