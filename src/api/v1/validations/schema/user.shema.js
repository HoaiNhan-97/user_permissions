const Joi = require("joi");

const registerSchema = Joi.object({
    email:Joi.string()
    .email()
    .required()
})
const verifyotpSchema  = Joi.object({
    email:Joi.string()
    .email()
    .required()
    ,
    otp:Joi.number()
    .integer()
    .required()
})
const loginSchema  = Joi.object({
    email:Joi.string()
    .email()
    .required(),
    password:Joi.string()
    .required()
})
const changePasswordSchema  = Joi.object({
    email:Joi.string()
    .email()
    .required(),
    old_password:Joi.string()
    .required(),
    new_password:Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    confirm_password:Joi.any()
    .equal(Joi.ref('new_password'))
    .required()

})
const refreshTokenSchema = Joi.object({
    email:Joi.string()
    .required()
})
const updateProfileSchema =  Joi.object({
    role:Joi.string()
    .valid("admin","teacher","student","parents"),
    username:Joi.string()
    .required()
    .min(3)
})
module.exports = {registerSchema,verifyotpSchema,loginSchema,changePasswordSchema,refreshTokenSchema,updateProfileSchema}