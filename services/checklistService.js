const checklistRepository = require("../repositories/checklistRepository");

class checklistService {
    static async createChecklist({
        user_id,
        name
    }) {
        try {
            if (!name) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nama checklist harus diisi",
                    data: {
                        created_checklist: null,
                    },
                };
            }

            const createChecklist = await checklistRepository.createChecklist({
                user_id,
                name
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil Membuat Checklist.",
                data: {
                    created_checklist: createChecklist,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "sumber tidak ada.",
                data: {
                    created_checklist: null,
                },
            };
        }
    };

    static async deleteChecklist({
        id,
        user_id,
    }) {
        const getChecklistById = await checklistRepository.getChecklistById({
            id
        });

        if (getChecklistById.user_id == user_id) {
            const deleteChecklist = await checklistRepository.deleteChecklist({
                id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Checklist berhasil dihapus",
                data: {
                    delete_checklist: deleteChecklist,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    delete_checklist: null,
                },
            };
        }
    };

    static async getChecklist({
        user_id,
    }) {
        try {
            const getChecklist = await checklistRepository.getChecklist({
                user_id,
            });

            return {
                status: true,
                statusCode: 201,
                message: "Checklist berhasil dijumlah",
                data: {
                    get_checklist: getChecklist,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    get_checklist: null,
                },
            };
        }

    };
}

module.exports = checklistService;