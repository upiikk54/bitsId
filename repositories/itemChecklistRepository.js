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

    // ------------------------- get item checklist by id ------------------------- //
    static async getItemChecklistById({
        id,
        checklist_id
    }) {
        const getItemChecklistById = await itemChecklist.findOne({
            where: {
                id,
                checklist_id
            }
        });

        return getItemChecklistById;
    };
    // ------------------------- End get item checklist by id ------------------------- //

    // ------------------------- update item checklist ------------------------- //
    static async updateItemChecklist({
        id,
        checklist_id,
        itemStatus
    }) {
        const updateItemChecklist = await itemChecklist.update({
            itemStatus
        }, {
            where: {
                id,
                checklist_id
            },
            returning: true
        });

        return updateItemChecklist[1][0];
    };
    // ------------------------- End update item checklist ------------------------- //

    // ------------------------- delete item checklist ------------------------- //
    static async deleteItemChecklist({
        id,
        checklist_id,
    }) {
        const deleteItemChecklist = await itemChecklist.destroy({
            where: {
                id,
                checklist_id
            }
        });

        return deleteItemChecklist;
    };
    // ------------------------- End delete item checklist ------------------------- //

    // ------------------------- update item checklist name ------------------------- //
    static async updateItemChecklistName({
        id,
        checklist_id,
        itemName
    }) {
        const updateItemChecklistName = await itemChecklist.update({
            itemName
        }, {
            where: {
                id,
                checklist_id
            },
            returning: true
        });

        return updateItemChecklistName[1][0];
    };
    // ------------------------- End update item checklist name ------------------------- //
}

module.exports = itemChecklistRepository