import * as EmailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import * as datamappers from '../models/index.datamapper.js';
import DatabaseError from '../errors/database.error.js';
import UserInputError from '../errors/user.input.error.js';

export default {
    async postSignup(req, res) {
        const {
            username, email, password, confirmPassword, avatar, role_id: roleId,
        } = req.body;

        try {
            if (!username
                 || !email
                 || !password
                 || !confirmPassword
                 || !roleId) {
                return res.json({ error: 'Missing values' });
            }

            // verification de l'email
            if (!EmailValidator.validate(email)) {
                return res.json({ error: 'Invalid email' });
            }

            // verifier si password correspond à password confirm
            if (password !== confirmPassword) {
                return res.render('register', {
                    error: 'Password confirmation is incorrect',
                });
            }

            const existEmail = await datamappers.userDatamapper.findOne(`email = '${email}'`);
            if (existEmail) {
                return res.json({
                    error: 'An error has occurred',
                });
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const encryptedPass = await bcrypt.hash(password, salt);

            const createUser = await datamappers.userDatamapper.create({
                username,
                email,
                avatar,
                password: encryptedPass,
                role_id: roleId,
            });

            return res.json(!!createUser);

            // res.status(201).json(user);
        } catch (err) {
            // code 23505 = unique_violation
            console.log('code', err);
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                throw new DatabaseError(err);
            }
        }
    },
};
