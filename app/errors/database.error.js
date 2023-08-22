export default class DatabaseError extends Error {
    constructor(err) {
        super(err.message);

        this.name = 'DatabaseError';
        this.status = 500;
        this.code = err.code;
        this.userMessage = 'Database Error';
        this.systemMessage = err.message;
    }
}
