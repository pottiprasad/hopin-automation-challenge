import Joi from "joi";

const customerSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  employees: Joi.number().required(),
  contactInfo: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  }).optional(),
  size: Joi.string().required(),
  text: Joi.string().required(),
});

const customerArraySchema = Joi.array().items(customerSchema);

const getSchema = (name) => {
  switch (name) {
    case "customer":
      return customerArraySchema;
  }
};

export default getSchema;
