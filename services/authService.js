const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");

const SALT_ROUND = 10;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/;
class authService {
    // ------------------------- Register ------------------------- //
    static async handleRegister({
        email,
        userName,
        password,
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!userName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "username maksimal 15 karakter.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki @",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki titik(.)",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password minimal 8 karakter.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung huruf besar.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung angka.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password tidak boleh diberi spasi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            const getUserByEmail = await userRepository.getUsersByEmail({
                email
            });

            if (getUserByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email telah digunakan.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
                const createdUser = await userRepository.handleRegister({
                    email,
                    userName,
                    password: hashedPassword,
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Registrasi berhasil.",
                    data: {
                        registeredUsers: createdUser,
                    },
                };
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    registeredUsers: null,
                },
            };
        }
    };
    // ------------------------- End Register ------------------------- //

    // ------------------------- Login ------------------------- //
    static async handleLogin({
        userName,
        password,
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);

            if (!userName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username harus diisi",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            }

            const getUsersByUsername = await userRepository.getUsersByUsername({
                userName
            });

            if (!getUsersByUsername) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else {
                const isPasswordMatch = await bcrypt.compare(password, getUsersByUsername.password);

                if (isPasswordMatch) {
                    const token = jwt.sign({
                        id: getUsersByUsername.id,
                        email: getUsersByUsername.email
                    },
                        JWT.SECRET, {
                        expiresIn: JWT.EXPIRED,
                    });

                    return {
                        status: true,
                        statusCode: 200,
                        message: "Pengguna berhasil masuk",
                        data: {
                            token,
                        },
                    };
                } else {
                    return {
                        status: true,
                        statusCode: 400,
                        message: "Username atau Password salah",
                        data: {
                            loginUsers: null,
                        },
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    loginUsers: null,
                },
            };
        }
    };
    // ------------------------- End Login ------------------------- //
}

module.exports = authService;