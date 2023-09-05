export default {
    /**
     * @typedef {object} Error
     * @property {string} error
     */

    /**
     * @typedef {object} Message
     * @property {string} message
     */

    /**
     * @typedef {object} SignupInputObject
     * @property {string} username - The username of the user
     * @property {string} email - The email of the user
     * @property {string} password - The password of the user
     * @property {string} confirmPassword - The password confirmation of the user
     * @property {string} avatar - The avatar of the user
     * @property {integer} role_id - The role id of the user
     */

    /**
     * @typedef {object} LoginInputObject
     * @property {string} email - The email of the user
     * @property {string} password - The password of the user
     */

    /**
     * @typedef {object} Game
     * @property {integer} id - The id of the game
     * @property {string} name - The name of the game
     * @property {string} description - The description of the game
     * @property {string} picture - The picture of the game
     * @property {string} external_link - The external link of the game
     * @property {string} release_date - The release date of the game
     * @property {integer} user_id - The user id of the game
     * @property {string} author - The author of the game
     * @property {Array<string>} categories - The categories of the game
     */
};
