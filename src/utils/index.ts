// MARK: Async Timer 
class AsyncTimer {
    static sleep(ms: number): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms); 
        });
    }
}

// MARK: Reponse Payload 
class LambdaResponseGenerator {
    static respond(statusCode: number, customHeader: string, data: any): object {
        const response = {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "x-custom-header" : customHeader,
                "Content-Type": "application/json"
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


// MARK: Generate a Random Integer from 0...n 
class NumberGenerator {
    static generate(max: number): number {
        return Math.floor(Math.random() * max);
    }
}


export { AsyncTimer, LambdaResponseGenerator, NumberGenerator, GenerateHashGenerator };