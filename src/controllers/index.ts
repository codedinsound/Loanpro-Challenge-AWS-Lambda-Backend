import { Database } from "../database_logic";

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

    query(q: string): any {

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

   setDatabase(database: Database): Database {
        this.database = database; 
        return this; 
   }
}

export { DatabaseManagerController }; 