const {
    users
} = require("../models");

class userRepository {
    // ------------------------- Get Users By Username ------------------------- //
    static async getUsersByUsername({
        userName
    }) {
        const getUser = await users.findOne({
            where: {
                userName: userName
            }
        });

        return getUser;
    };
    // ------------------------- End Get Users By Username ------------------------- //

    // ------------------------- Get Users By By Email ------------------------- //
    static async getUsersByEmail({
        email
    }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    };
    // ------------------------- End Get Users By By Email ------------------------- //


    // ------------------------- Register ------------------------- //
    static async handleRegister({
        email,
        userName,
        password
    }) {
        const registeredUser = users.create({
            email,
            userName,
            password
        });

        return registeredUser;
    };
    // ------------------------- End Register ------------------------- //
}

module.exports = userRepository;