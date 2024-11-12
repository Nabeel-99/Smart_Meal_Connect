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

export const validatePost = (data) => {
  const schema = Joi.object({
    images: Joi.array().min(1).required().messages({
      "array.min": "At least one image is required.",
      "array.base": "Images must be an array.",
      "any.required": "Images are required.",
    }),
    title: Joi.string().min(3).required().messages({
      "string.base": "Title must be a string.",
      "string.min": "Title must be at least 3 characters long.",
      "any.required": "Title is required.",
    }),
    prepTime: Joi.number().positive().required().messages({
      "number.base": "Cooking time must be a number.",
      "number.positive": "Cooking time must be a positive number.",
      "any.required": "Cooking time is required.",
    }),
    category: Joi.string().required().messages({
      "string.base": "Category must be a string.",
      "any.required": "Category is required.",
    }),
    ingredients: Joi.array().min(1).required().messages({
      "array.base": "Ingredients must be an array.",
      "array.min": "At least one ingredient is required.",
      "any.required": "Ingredients are required.",
    }),
    instructions: Joi.string().min(10).required().messages({
      "string.base": "Instructions must be a string.",
      "string.min": "Instructions must be at least 10 characters long.",
      "any.required": "Instructions are required.",
    }),

    // videoLink: Joi.string().uri().optional(),
  });

  return schema.validate(data);
};

export const validateUpdatePost = (data) => {
  const schema = Joi.object({
    images: Joi.array().min(1).messages({
      "array.min": "At least one image is required.",
      "array.base": "Images must be an array.",
      "any.required": "Images are required.",
    }),
    title: Joi.string().min(3).messages({
      "string.base": "Title must be a string.",
      "string.min": "Title must be at least 3 characters long.",
      "any.required": "Title is required.",
    }),
    prepTime: Joi.number().positive().messages({
      "number.base": "Cooking time must be a number.",
      "number.positive": "Cooking time must be a positive number.",
      "any.required": "Cooking time is required.",
    }),
    category: Joi.string().messages({
      "string.base": "Category must be a string.",
      "any.required": "Category is required.",
    }),
    ingredients: Joi.array().min(1).messages({
      "array.base": "Ingredients must be an array.",
      "array.min": "At least one ingredient is required.",
      "any.required": "Ingredients are required.",
    }),
    instructions: Joi.string().min(10).messages({
      "string.base": "Instructions must be a string.",
      "string.min": "Instructions must be at least 10 characters long.",
      "any.required": "Instructions are required.",
    }),
    deletedImages: Joi.array().items(Joi.string()).optional().default([]),
    // videoLink: Joi.string().uri().optional(),
  });

  return schema.validate(data);
};
