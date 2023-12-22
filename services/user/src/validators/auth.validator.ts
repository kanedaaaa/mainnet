import joi from "joi";
import { ValidationError } from "../handlers/error.handler";

async function validateAuth(method: any, input: any) {
  switch (method) {
    case "signup": {
      const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        fullName: joi.string().required(),
        bio: joi.string().required()
      });

      return await schema.validateAsync(input);
    }

    case "login": {
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });

      return await schema.validateAsync(input);
    }

    case "updateProfile": {
      const schema = joi.object({
        fullName: joi.string(),
        bio: joi.string(),
        username: joi.string()
      });

      return await schema.validateAsync(input);
    }
  }
}

async function ValidateAndThrow(method: any, input: any) {
  try {
    await validateAuth(method, input);
  } catch (err: any) {
    throw new ValidationError(err.message);
  }
}

export default ValidateAndThrow;
