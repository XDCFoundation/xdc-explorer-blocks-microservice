import Utils from '../app/utils'
import * as yup from 'yup'

module.exports = {
  validateUserLogin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().min(8).required()
    })
    await validate(schema, req.body, res, next)
  },

  validateLatestBlocks: async (req, res, next) => {
    const schema = yup.object().shape({
      skip: yup.string().required(),
      limit: yup.string().required()
    })
    await validate(schema, req.query, res, next)
  },
  validateBlockNumber: async (req, res, next) => {
    const schema = yup.object().shape({
      blockNumber: yup.string().required(),
    })
    await validate(schema, req.params, res, next)
  }

}

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false })
    next()
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({ path, message, value }))
    Utils.responseForValidation(res, errors)
  }
}
