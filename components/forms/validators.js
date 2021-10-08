import validator from 'validator'

export const required = (value) => (value ? undefined : 'Required')
export const isEmail = (value) =>
  validator.isEmail(value || '')
    ? undefined
    : 'Hmm, try double checking your email'
export const isStrongPassword = (value) => {
  if (!value) {
    return 'Required'
  }
  if (value.length < 8) {
    return 'A strong password is 8 characters or longer'
  }

  return undefined
}

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )
