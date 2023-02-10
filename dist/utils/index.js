"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateHashGenerator = exports.NumberGenerator = exports.LambdaResponseGenerator = exports.AsyncTimer = void 0;
// MARK: Async Timer 
class AsyncTimer {
    static sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
exports.AsyncTimer = AsyncTimer;
// MARK: Reponse Payload 
class LambdaResponseGenerator {
    static respond(statusCode, customHeader, data) {
        const response = {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "x-custom-header": customHeader,
                "Content-Type": "application/json"
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
// MARK: Generate a Random Integer from 0...n 
class NumberGenerator {
    static generate(max) {
        return Math.floor(Math.random() * max);
    }
}
exports.NumberGenerator = NumberGenerator;
//# sourceMappingURL=index.js.map