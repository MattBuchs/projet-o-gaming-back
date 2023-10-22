// Custom Password Validation Feature
const isValidPassword = (password) => {
    const minLength = 12;
    // regex to check if password has at least one lowercase,
    // one uppercase, one digit and one special character
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*/]/.test(password);

    return {
        passwordLength: password.length >= minLength,
        toLowercase: hasLowercase,
        toUppercase: hasUppercase,
        toDigit: hasDigit,
        toSpecialChar: hasSpecialChar,
    };
};

// Password validation middleware
const passwordSecurityMiddleware = (req, res, next) => {
    const { password } = req.body;
    const passwordValidation = isValidPassword(password);

    // check if password is valid
    const isValid = Object.values(passwordValidation).every((value) => value === true);

    if (!isValid) {
        const errorMessages = [];

        if (!passwordValidation.passwordLength) errorMessages.push('12 characters');
        if (!passwordValidation.toLowercase) errorMessages.push('a lowercase');
        if (!passwordValidation.toUppercase) errorMessages.push('a uppercase');
        if (!passwordValidation.toDigit) errorMessages.push('a digit');
        if (!passwordValidation.toSpecialChar) errorMessages.push('a special character');

        return res.status(400).json({ error: `The password must have at least ${errorMessages.join(', ')}` });
    }

    next();
};

export default passwordSecurityMiddleware;
