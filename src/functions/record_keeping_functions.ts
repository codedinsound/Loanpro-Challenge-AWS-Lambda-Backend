// MARK: Create a new User Arithmetic Record 
function createArithmeticRecord(userID: number, operation: string, res: string, cost: number, newBalance: number, db: any): void {
    db.query(`CREATE_RECORD USER= ${userID} OPERATION= ${operation} RES= ${res} AMOUNT= ${cost} USER_BALANCE= ${newBalance}`);
}


// MARK: Gets Users Arithmetic Records 
function getUserArithmeticRecords() {

}

export { createArithmeticRecord, getUserArithmeticRecords }; 