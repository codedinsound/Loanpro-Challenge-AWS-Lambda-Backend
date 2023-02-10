import { Database } from "../database_logic";

// MARK: Database Manager Controller 
class DatabaseManagerController {
    private database: any;

    constructor() {}

    connect(): Promise<any> {
        return this.database.connect(); 
    }

    disconnect(): void {
        this.database.disconnect(); 
    }

    query(q: string): Promise<any> {

        let res: any; 
        try {
            res = this.database.query(q); 
        } catch (error: any) {

            res = {
                error: error.message
            }
        }

        return new Promise((resolve) => resolve(res)); 
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