const checklistService = require("../services/checklistService");

// ------------------------- Create Checklist ------------------------- //
const createChecklist = async (req, res) => {
    const {
        name
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await checklistService.createChecklist({
        user_id,
        name
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Create Checklist ------------------------- //

// ------------------------- Delete Checklist ------------------------- //
const deleteChecklist = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await checklistService.deleteChecklist({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Delete Checklist ------------------------- //

// ------------------------- get Checklist ------------------------- //
const getChecklist = async (req, res) => {

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await checklistService.getChecklist({
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Checklist ------------------------- //

module.exports = {
    createChecklist,
    deleteChecklist,
    getChecklist
};