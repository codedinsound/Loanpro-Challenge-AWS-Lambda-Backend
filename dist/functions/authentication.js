"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const controllers_1 = require("../controllers");
const database_logic_1 = require("../database_logic");
function generateToken(response, p, database) {
    if (response.error)
        return { error: response.error };
    if (response.password !== p)
        return { error: "Wrong Password!" };
    if (response.status === 'inactive')
        return { error: "User account is inactive!" };
    // Get Users Balance 
    // console.log('generate token: ', response);
    const balance = database.query(`BALANCE USER= ${response.id}`);
    return {
        status: 'active',
        date: new Date(),
        balance,
        userID: response.id,
        username: response.username
    };
}
function authenticateUser(data) {
    const database = controllers_1.DatabaseManagerController.instance();
    database.setDatabase(new database_logic_1.ExcelSheetTestDatabase());
    database.connect();
    let response = database.query(`AUTH ${data.u} ${data.p}`);
    database.disconnect();
    return generateToken(response, data.p, database);
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authentication.js.map