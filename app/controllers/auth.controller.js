import * as EmailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
                return res.status(400).json({ error: 'Missing values' });
            }

            // verification de l'email
            if (!EmailValidator.validate(email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }

            // verifier si password correspond à password confirm
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Password and confirm password are not the same' });
            }

            const existEmail = await datamappers.userDatamapper.findByEmail(email);
            if (existEmail) {
                return res.status(400).json({
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
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                throw new DatabaseError(err);
            }
        }
    },

    async postLogin(req, res) {
        const { email, password } = req.body;

        try {
            if (!EmailValidator.validate(email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }

            const existUser = await datamappers.userDatamapper.findByEmail(email);
            if (!existUser) {
                return res.status(400).json({ error: 'Incorrect email or password' });
            }

            const passOk = await bcrypt.compare(password, existUser.password);
            if (!passOk) {
                return res.status(400).json({ error: 'Incorrect email or password' });
            }

            const role = await datamappers.roleDatamapper.findByPk(existUser.role_id);

            const user = {
                userId: existUser.id,
                role: role.name,
                username: existUser.username,
            };

            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.json({ token });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                throw new DatabaseError(err);
            }
        }
    },
};
