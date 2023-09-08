export default class UserInputError extends Error {
    constructor(err) {
        super(err.message);

        this.status = 400;

        if (err.name === 'ValidationError') {
            this.userMessage = err.details[0].message;
        } else if (err.code === '23505') {
            this.userMessage = 'Duplicate Error';
        } else {
            this.userMessage = 'Unknown Input Error';
        }

        this.name = 'UserInputError';
    }
}
