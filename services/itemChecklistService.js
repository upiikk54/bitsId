const checklistRepository = require("../repositories/checklistRepository");
const itemChecklistRepository = require("../repositories/itemChecklistRepository");

class itemChecklistService {
    static async createItemChecklist({
        user_id,
        itemName,
        checklist_id,
    }) {
        try {
            if (!itemName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nama checklist harus diisi",
                    data: {
                        created_item_checklist: null,
                    },
                };
            }

            const createItemChecklist = await itemChecklistRepository.createItemChecklist({
                user_id,
                itemName,
                checklist_id,
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil Membuat Item Checklist.",
                data: {
                    created_item_checklist: createItemChecklist,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "sumber tidak ada.",
                data: {
                    created_item_checklist: null,
                },
            };
        }
    };

    static async getItemChecklist({
        checklist_id
    }) {
        try {

            const getItemChecklist = await itemChecklistRepository.getItemChecklist({
                checklist_id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Berhasil mendapatkan item checklist",
                data: {
                    get_item_checklist: getItemChecklist,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 404,
                message: "Checklist tidak ditemukan",
                data: {
                    get_item_checklist: null,
                },
            };
        }

    };
}

module.exports = itemChecklistService;