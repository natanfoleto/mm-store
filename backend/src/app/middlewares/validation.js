export default function validation (schema, property) {
  return async (req, res, next) => {
    const validate = schema.validate(req[property || 'body'])
    const valid = validate.error == null

    if (valid) {
      next()
    } else {
      res.status(422).json({
        result: 'warn',
        message: validate.error.details[0].message
      })
    }
  }
}
