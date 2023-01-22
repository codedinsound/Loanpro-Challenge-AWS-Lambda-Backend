// MARK: Database Model 
interface Database {
    connect(): Promise<any> 
    disconnect(): void 
    query(q: string): Promise<any>
}



export { Database }