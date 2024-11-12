import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};
// validate the updated user details
export const validateUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    email: Joi.string().email().label("Email"),
    password: passwordComplexity().label("password"),
  });
  return schema.validate(data);
};
// validate reset password
export const validateResetPassword = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    newPassword: passwordComplexity().required().label("New Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .label("Confirm Password"),
  });
  return schema.validate(data);
};

// export const validatePost = (data) => {
//   const schema = Joi.object({
//     title: Joi.string().min(3).required(),
//     instructions: Joi.string().min(10).required(),
//     prepTime: Joi.number().positive().required(),
//     ingredients: Joi.array().min(1).required(),
//     category: Joi.string().required(),
//     images: Joi.array().min(1).required(),
//     videoLink: Joi.string().uri().optional(),
//   });
//   return schema.validate(data);
// };
