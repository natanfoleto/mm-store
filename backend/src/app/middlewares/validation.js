export default function validation(schema, property) {
  return async (req, res, next) => {
    const validate = schema.validate(req[property])
    const valid = validate.error == null

    if (valid) {
      next()
    } else {
      res.status(206).json(validate)
    }
  }
}
