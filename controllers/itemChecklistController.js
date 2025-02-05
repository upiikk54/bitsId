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

// ------------------------- get item checklist ------------------------- //
const getItemChecklistById = async (req, res) => {
    const {
        id,
        itemid
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await itemChecklistService.getItemChecklistById({
        id: itemid,
        checklist_id: id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End item checklist ------------------------- //

// ------------------------- update item checklist ------------------------- //
const updateItemChecklist = async (req, res) => {
    const {
        id,
        itemid
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await itemChecklistService.updateItemChecklist({
        id: itemid,
        checklist_id: id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End update item checklist ------------------------- //

// ------------------------- delete item checklist ------------------------- //
const deleteItemChecklist = async (req, res) => {
    const {
        id,
        itemid
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await itemChecklistService.deleteItemChecklist({
        id: itemid,
        checklist_id: id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End delete item checklist ------------------------- //

// ------------------------- update item checklist name ------------------------- //
const updateItemChecklistName = async (req, res) => {
    const {
        id,
        itemid
    } = req.params;

    const {
        itemName
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await itemChecklistService.updateItemChecklistName({
        id: itemid,
        checklist_id: id,
        itemName
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End update item checklist name ------------------------- //

module.exports = {
    createItemChecklist,
    getItemChecklist,
    getItemChecklistById,
    updateItemChecklist,
    deleteItemChecklist,
    updateItemChecklistName
}