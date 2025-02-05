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

    static async getItemChecklistById({
        id,
        checklist_id,
    }) {
        try {

            const getItemChecklistById = await itemChecklistRepository.getItemChecklistById({
                id,
                checklist_id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Berhasil mendapatkan item checklist",
                data: {
                    get_item_checklist_by_id: getItemChecklistById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 404,
                message: "Item checklist tidak ditemukan",
                data: {
                    get_item_checklist_by_id: null,
                },
            };
        }
    };

    static async updateItemChecklist({
        id,
        checklist_id,
    }) {
        try {
            const currentItem = await itemChecklistRepository.getItemChecklistById({
                id,
                checklist_id,
            });

            if (!currentItem) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Item checklist tidak ditemukan",
                    data: {
                        updated_item_checklist: null,
                    },
                };
            }

            const newStatus = !currentItem.itemStatus;
            const updatedItem = await itemChecklistRepository.updateItemChecklist({
                id,
                checklist_id,
                itemStatus: newStatus
            });

            return {
                status: true,
                statusCode: 200,
                message: "Status item checklist berhasil diupdate",
                data: {
                    updated_item_checklist: updatedItem,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: "Gagal mengupdate status item checklist",
                data: {
                    updated_item_checklist: null,
                },
            };
        }
    };

    static async deleteItemChecklist({
        id,
        checklist_id,
    }) {
        try {
            const currentItem = await itemChecklistRepository.getItemChecklistById({
                id,
                checklist_id,
            });

            if (!currentItem) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Item checklist tidak ditemukan",
                    data: {
                        deleted_item_checklist: null,
                    },
                };
            }

            const deletedItem = await itemChecklistRepository.deleteItemChecklist({
                id,
                checklist_id
            });

            return {
                status: true,
                statusCode: 200,
                message: "Item checklist berhasil dihapus",
                data: {
                    deleted_item_checklist: deletedItem,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: "Gagal menghapus item checklist",
                data: {
                    deleted_item_checklist: null,
                },
            };
        }
    };

    static async updateItemChecklistName({
        id,
        checklist_id,
        itemName
    }) {
        try {
            const currentItem = await itemChecklistRepository.getItemChecklistById({
                id,
                checklist_id,
            });

            if (!currentItem) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Item checklist tidak ditemukan",
                    data: {
                        updated_item_checklist: null,
                    },
                };
            }

            const updatedItem = await itemChecklistRepository.updateItemChecklistName({
                id,
                checklist_id,
                itemName
            });

            return {
                status: true,
                statusCode: 200,
                message: "Nama item checklist berhasil diupdate",
                data: {
                    updated_item_checklist: updatedItem,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: "Gagal mengupdate nama item checklist",
                data: {
                    updated_item_checklist: null,
                },
            };
        }
    };
}

module.exports = itemChecklistService;