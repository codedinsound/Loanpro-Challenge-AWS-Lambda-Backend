// MARK: Database Model 
interface Database {
    connect(): void 
    disconnect(): void 
    query(q: string): void
}



export { Database }