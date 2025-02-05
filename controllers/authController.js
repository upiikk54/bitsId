const authService = require("../services/authService");

// ------------------------- Auth Register ------------------------- //
const handleRegister = async (req, res) => {
    const {
        email,
        userName,
        password,
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleRegister({
        email,
        userName,
        password,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};
// ------------------------- End Auth Register ------------------------- //

// ------------------------- Auth Login ------------------------- //
const handleLogin = async (req, res) => {
    const {
        userName,
        password
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleLogin({
        userName,
        password
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};
// ------------------------- End Auth Login ------------------------- //

module.exports = {
    handleRegister,
    handleLogin,
};