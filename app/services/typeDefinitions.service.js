export default {
    // * Error
    /**
     * @typedef {object} Error
     * @property {string} error
     */

    // * Message
    /**
     * @typedef {object} Message
     * @property {string} message
     */

    // * Auth
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

    // * GET
    /**
     * @typedef {object} Game
     * @property {integer} id - The id of the game
     * @property {string} name - The name of the game
     * @property {string} description - The description of the game
     * @property {string} picture - The picture of the game
     * @property {string} external_link - The external link of the game
     * @property {string} release_date - The release date of the game
     * @format date
     * @property {integer} user_id - The user id of the game
     * @property {string} author - The author of the game
     * @property {Array<string>} categories - The categories of the game
     * @property {string} release_date.format - The release_date format is Timestamptz
     */

    /**
     * @typedef {object} Issue
     * @property {integer} id - The id of the issue
     * @property {string} title - The title of the issue
     * @property {string} description - The description of the issue
     * @property {string} status - The status of the issue
     * @property {boolean} is_minor - The is_minor of the issue
     * @property {string} assign_to - The assign_to of the issue
     * @property {boolean} is_public - The is_public of the issue
     * @property {boolean} is_online - The is_online of the issue
     * @property {string} frequency - The frequency of the issue
     * @property {string} replication - The replication of the issue
     * @property {string} published_at - The published_at of the issue
     * @property {integer} user_id - The user_id of the issue
     * @property {string} author - The author of the issue
     * @property {integer} platform_id - The platform_id of the issue
     * @property {string} platform - The platform of the issue
     * @property {Array<string>} tags - The tags of the issue
     */

    /**
     * @typedef {object} Suggestion
     * @property {integer} id - The id of the suggestion
     * @property {string} title - The title of the suggestion
     * @property {string} description - The description of the suggestion
     * @property {string} published_at - The published_at of the suggestion
     * @property {integer} user_id - The user_id of the suggestion
     * @property {string} author - The author of the suggestion
     * @property {integer} platform_id - The platform_id of the suggestion
     * @property {string} platform - The platform of the suggestion
     */

    /**
     * @typedef {object} Users
     * @property {integer} id - The id of the user
     * @property {string} username - The username of the user
     * @property {string} email - The email of the user
     * @property {string} avatar - The avatar of the user
     */

    /**
     * @typedef {object} User
     * @property {integer} id - The id of the user
     * @property {string} username - The username of the user
     * @property {string} email - The email of the user
     * @property {string} avatar - The avatar of the user
     * @property {integer} role - The role of the user
     * @property {Array<Game>} games - The games of the user
     */

    /**
     * @typedef {object} Category
     * @property {integer} id - The id of the category
     * @property {string} name - The name of the category
     * @property {string} color - The color of the category
     */

    /**
     * @typedef {object} Search
     * @property {Array<Game>} games - The games of the search
     * @property {Array<Users>} users - The users of the search
     */

    /**
     * @typedef {object} Platforms
     * @property {integer} id - The id of the platform
     * @property {string} name - The name of the platform
     */

    /**
     * @typedef {object} Tags
     * @property {integer} id - The id of the tag
     * @property {string} title - The title of the tag
     */

    // * CREATE
    /**
     * @typedef {object} CreateGameObject
     * @property {string} name - The name of the game
     * @property {string} description - The description of the game
     * @property {string} picture - The picture of the game
     * @property {string} external_link - The external link of the game
     * @property {string} release_date - The release date of the game
     * @property {Array.<string>} categories - The categories of the game
     * @property {Array.<string>} tags - The tags of the game
     */

    /**
     * @typedef {object} CreateIssueObject
     * @property {string} title - The title of the issue
     * @property {string} description - The description of the issue
     * @property {boolean} is_minor - The is_minor of the issue
     * @property {boolean} is_public - The is_public of the issue
     * @property {boolean} is_online - The is_online of the issue
     * @property {string} frequency - The frequency of the issue
     * @property {string} replication - The replication of the issue
     * @property {string} published_at - The published_at of the issue
     * @property {integer} user_id - The user_id of the issue
     * @property {integer} platform_id - The platform_id of the issue
     * @property {Array.<string>} tags - The tags of the issue
     */

    /**
     * @typedef {object} CreateSuggestionObject
     * @property {string} title - The title of the suggestion
     * @property {string} description - The description of the suggestion
     * @property {boolean} is_minor - The is_minor of the suggestion
     * @property {boolean} is_public - The is_public of the suggestion
     * @property {boolean} is_online - The is_online of the suggestion
     * @property {string} frequency - The frequency of the suggestion
     * @property {string} replication - The replication of the suggestion
     * @property {string} published_at - The published_at of the suggestion
     * @property {integer} user_id - The user_id of the suggestion
     * @property {integer} platform_id - The platform_id of the suggestion
     */

    // * UPDATE
    /**
     * @typedef {object} UpdateGameObject
     * @property {string} name - The name of the game
     * @property {string} description - The description of the game
     * @property {string} picture - The picture of the game
     * @property {string} external_link - The external link of the game
     */

    /**
     * @typedef {object} UpdateIssueObject
    *  @property {string} title - The title of the issue
     * @property {string} description - The description of the issue
     * @property {boolean} is_minor - The is_minor of the issue
     * @property {boolean} is_public - The is_public of the issue
     * @property {boolean} is_online - The is_online of the issue
     * @property {string} frequency - The frequency of the issue
     * @property {string} replication - The replication of the issue
     * @property {integer} platform_id - The platform_id of the issue
     */

    /**
     * @typedef {object} UpdateSuggestionObject
     * @property {string} title - The title of the suggestion
     * @property {string} description - The description of the suggestion
     * @property {boolean} is_minor - The is_minor of the suggestion
     * @property {boolean} is_public - The is_public of the suggestion
     * @property {boolean} is_online - The is_online of the suggestion
     * @property {string} frequency - The frequency of the suggestion
     * @property {string} replication - The replication of the suggestion
     * @property {integer} platform_id - The platform_id of the suggestion
     */

    /**
     * @typedef {object} UpdateUserObject
     * @property {string} username - The username of the user
     * @property {string} password - The password of the user
     */
};
