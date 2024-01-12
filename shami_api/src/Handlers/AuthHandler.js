const signIn = require("../controllers/Auth/signIn")
const signUp = require("../controllers/Auth/signUp")

const signUpHandler = async (req, res) => {
    const { username, email, password, roles, store } = await req.body;

    try {
        const signup = await signUp(username, email, password, roles, store)
        res.status(200).json(signup)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const signInHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const signin = await signIn( email, password)
        res.status(200).json(signin)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    signUpHandler,
    signInHandler
}