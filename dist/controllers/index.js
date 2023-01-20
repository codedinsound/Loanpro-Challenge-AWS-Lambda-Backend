"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManagerController = void 0;
class DatabaseManagerController {
    constructor() {
    }
    connect() {
        this.database.connect();
    }
    disconnect() {
        this.database.disconnect();
    }
    query(q) {
        let res;
        try {
            res = this.database.query(q);
        }
        catch (error) {
            res = {
                error: error.message
            };
        }
        return res;
    }
    static instance() {
        return new DatabaseManagerController();
    }
    setDatabase(database) {
        this.database = database;
    }
}
exports.DatabaseManagerController = DatabaseManagerController;
//# sourceMappingURL=index.js.map