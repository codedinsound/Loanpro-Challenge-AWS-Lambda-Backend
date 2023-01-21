"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateHashGenerator = exports.LambdaResponseGenerator = void 0;
// MARK: Reponse Payload 
class LambdaResponseGenerator {
    static respond(statusCode, customHeader, data) {
        const response = {
            statusCode,
            headers: {
                "x-custom-header": "User Authenticated"
            },
            body: JSON.stringify(data)
        };
        return response;
    }
}
exports.LambdaResponseGenerator = LambdaResponseGenerator;
// MARK: Generate a Hash from a string 
class GenerateHashGenerator {
    static generate(secret = 'abc123') {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha256', secret)
            .update('some data to be hashed')
            .digest('hex');
        return hash;
    }
}
exports.GenerateHashGenerator = GenerateHashGenerator;
//# sourceMappingURL=index.js.map