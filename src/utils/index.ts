// MARK: Reponse Payload 
class LambdaResponseGenerator {
    static respond(statusCode: number, customHeader: string, data: any) {
        const response = {
            statusCode,
            headers: {
                "x-custom-header" : "User Authenticated"
            },
            body: JSON.stringify(data)
        }
        return response; 
    }
}

// MARK: Generate a Hash from a string 
class GenerateHashGenerator {
    static generate(secret: string = 'abc123') {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha256', secret)
                           .update('some data to be hashed')
                           .digest('hex');
        return hash; 
    }
}


export { LambdaResponseGenerator, GenerateHashGenerator };