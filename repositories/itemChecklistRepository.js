const {
    itemChecklist
} = require("../models");

class itemChecklistRepository {
    // ------------------------- Create item checklist ------------------------- //
    static async createItemChecklist({
        user_id,
        itemName,
        checklist_id
    }) {
        const createChecklist = itemChecklist.create({
            user_id,
            itemName,
            checklist_id
        });

        return createChecklist;
    };
    // ------------------------- End Create item checklist ------------------------- //

    // ------------------------- get item checklist ------------------------- //
    static async getItemChecklist({
        checklist_id
    }) {
        const getItemChecklist = await itemChecklist.findAll({
            where: {
                checklist_id
            }
        });

        return getItemChecklist;
    };
    // ------------------------- End get item checklist ------------------------- //
}

module.exports = itemChecklistRepository