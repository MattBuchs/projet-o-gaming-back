// Middleware de validation du mot de passe

// Fonction de validation du mot de passe personnalisée
const isValidPassword = (password) => {
    const minLength = 12;
    // const passwordLength = password.length >= minLength;
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

const passwordSecurityMiddleware = (req, res, next) => {
    const { password } = req.body;
    const passwordValidation = isValidPassword(password);

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
