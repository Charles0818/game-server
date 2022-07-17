import * as joi from '@hapi/joi';
console.log('var', process.env);
// validating environment variables
export const envValidationSchema = joi
  .object({
    // database config
    PGHOST: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().required(),
    PGDATABASE: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown()
  .required();
