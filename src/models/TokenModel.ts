interface TokenModel {
    status: string, 
    date: Date, 
    balance: number, 
    userID: number,
    username: string, 
    sessionToken: string
};

export { TokenModel }; 