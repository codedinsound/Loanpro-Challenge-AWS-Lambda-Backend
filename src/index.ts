import { LambdaResponseGenerator } from "./utils";
import { authenticateUser, getUserArithmeticRecords, processUserOperation } from "./functions";

// ==========================================================================================================
// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Handler Lambda
export const authenticate = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..."}); 

    const body = JSON.parse(event.body); 
    const token = await authenticateUser(body); 

    return LambdaResponseGenerator.respond(200, 'User Authenticated', token);  
}

// MARK: Process User Arithmetic Operation Handler Lambda
export const processUserArithmeticOperation = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..."}); 
    
    const body = JSON.parse(event.body); 
    const token = await processUserOperation(body); 

    return LambdaResponseGenerator.respond(200, 'Operation Handled', token); 
}; 

// MARK: Retrieves Users Operation Records Record of User
export const retrieveUserOperationsRecord = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..."}); 

    const body = JSON.parse(event.body); 
    const token = await getUserArithmeticRecords(body); 

    return LambdaResponseGenerator.respond(200, 'Records Retrieved', token);     
}; 