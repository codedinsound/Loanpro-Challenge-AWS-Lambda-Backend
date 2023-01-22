"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserOperation = exports.authenticateUser = exports.getUserArithmeticRecords = exports.createArithmeticRecord = void 0;
const authentication_1 = require("./authentication");
Object.defineProperty(exports, "authenticateUser", { enumerable: true, get: function () { return authentication_1.authenticateUser; } });
const operations_1 = require("./operations");
Object.defineProperty(exports, "processUserOperation", { enumerable: true, get: function () { return operations_1.processUserOperation; } });
const record_keeping_functions_1 = require("./record_keeping_functions");
Object.defineProperty(exports, "createArithmeticRecord", { enumerable: true, get: function () { return record_keeping_functions_1.createArithmeticRecord; } });
Object.defineProperty(exports, "getUserArithmeticRecords", { enumerable: true, get: function () { return record_keeping_functions_1.getUserArithmeticRecords; } });
//# sourceMappingURL=index.js.map