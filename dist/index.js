"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const databases_1 = require("./databases");
const enviroment = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || '';
console.log(`Current Enviroment Set: ${enviroment}`);
function generateTestHashToStoreInDB() {
    const crypto = require('crypto');
    const secret = 'abc123456';
    const hash = crypto.createHmac('sha256', secret)
        .update('some data to be hashed')
        .digest('hex');
    console.log(hash);
    return "";
}
function generateToken(response, p) {
    if (response.password !== p)
        return { error: "Wrong Password!" };
    if (response.status === 'inactive')
        return { error: "User account is locked" };
    return {
        status: 'active',
        date: new Date(),
        userID: response.id,
        username: response.username
    };
}
function aunthicateUser(data) {
    const { DatabaseManagerController } = require('./controllers');
    const database = DatabaseManagerController.instance();
    database.setDatabase(new databases_1.ExcelSheetTestDatabase());
    database.connect();
    let response = database.query(`AUTH ${data.u} ${data.p}`);
    if (response.error)
        console.log('send the error', response);
    database.disconnect();
    return generateToken(response, data.p);
}
// if (enviroment === "development") app.listen(PORT, () => console.log(`Listening on Local Port: ${PORT}`)) ;
// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Lambda
const authenticate = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const token = aunthicateUser(event);
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "User Authenticated"
        },
        body: JSON.stringify(token)
    };
    return response;
});
exports.authenticate = authenticate;
//# sourceMappingURL=index.js.map