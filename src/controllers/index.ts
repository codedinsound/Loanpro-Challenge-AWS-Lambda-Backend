import { Database } from "../models";


// MARK: Database Manager Controller 
class DatabaseManagerController {
    private database: any;

    constructor() {
    }

    connect(): void {
        this.database.connect(); 
    }

    disconnect(): void {
        this.database.disconnect(); 
    }

    query(q: string): void {

        let res: any; 
        try {
            res = this.database.query(q); 
        } catch (error: any) {

            res = {
                error: error.message
            }
        }

        return res; 
    }

   static instance(): DatabaseManagerController {
        return new DatabaseManagerController(); 
   }

   setDatabase(database: Database) {
        this.database = database; 
   }
}

export { DatabaseManagerController }; 