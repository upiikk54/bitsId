const {
    checklist
} = require("../models");

class checklistRepository {
    // ------------------------- Create Checklist ------------------------- //
    static async createChecklist({
        user_id,
        name
    }) {
        const createChecklist = checklist.create({
            user_id,
            name
        });

        return createChecklist;
    };
    // ------------------------- End Create Checklist ------------------------- //

    // ------------------------- Delete Checklist ------------------------- //
    static async deleteChecklist({
        id
    }) {
        const deleteChecklist = checklist.destroy({
            where: {
                id
            }
        });

        return deleteChecklist;
    };
    // ------------------------- End Delete Checklist ------------------------- //

    // ------------------------- Get Checklist By Id ------------------------- //
    static async getChecklistById({
        id
    }) {
        const getChecklist = await checklist.findOne({
            where: {
                id
            }
        });

        return getChecklist;
    };
    // ------------------------- End Get Checklist By Id ------------------------- //

    // ------------------------- get Checklist ------------------------- //
    static async getChecklist({
        user_id,
    }) {
        const getChecklist = await checklist.findAll({
            where: {
                user_id
            }
        });

        return getChecklist;
    };
    // ------------------------- End get Checklist ------------------------- //
}

module.exports = checklistRepository;