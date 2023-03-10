"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManagerController = void 0;
// MARK: Database Manager Controller 
class DatabaseManagerController {
    constructor() { }
    connect() {
        return this.database.connect();
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
        return new Promise((resolve) => resolve(res));
    }
    setDatabase(database) {
        this.database = database;
        return this;
    }
    static instance() {
        return new DatabaseManagerController();
    }
}
exports.DatabaseManagerController = DatabaseManagerController;
//# sourceMappingURL=DatabaseManagerController.js.map