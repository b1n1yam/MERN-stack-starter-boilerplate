const JWT = require("jsonwebtoken");
const Usermodel = require("../models/admin");
const { JWT_SECRET } = require("../config/jwt");

signToken = user => {
  return JWT.sign(
    {
      iss: "tomo",
      sub: user.id,
      iat: new Date().getTime() // current time
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password } = req.body;

    //check if email already exists
    const Emailisexist = await Usermodel.findOne({ email: email });
    if (Emailisexist) {
      return res.status(403).json({ error: "The email is already exists" });
    }

    //create a new user
    const newUser = new Usermodel({
      name: name,
      email: email,
      password: password
    });
    await newUser.save();

    //Respond with token
    res.json({
      user: newUser
    });
  },

  signIn: async (req, res, next) => {
    //token create
    const token = signToken(req.user);
    res.json({
      token,
      user: req.user
    });
  }
};
