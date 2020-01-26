const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = {
  validateRegisterationInput: async (req, res, next) => {
    let data = req.body;
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.name)) {
      errors.name = "name field is invalid";
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = "email field is required";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "password field is required";
    }

    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    next();
  }
};
