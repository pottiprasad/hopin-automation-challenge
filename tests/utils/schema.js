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
});

const customersSchema = Joi.object().keys({
  name: Joi.string().optional(),
  timestamp: Joi.string().optional(),
  customers: Joi.array().items(customerSchema),
})

const getSchema = (name) => {
  switch (name) {
    case "customers":
      return customersSchema;
  }
};

export default getSchema;
