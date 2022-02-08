import { ElMessage } from 'element-plus'

import errors from '@/resources/errors.json'

/**
 * Returns pretty error messages
 * @param {Object} error - Error Object
 * @param {string} error.code - Error code
 * @param {string} error.message - Error message
 * @returns {string} - Error message
 */
export function prettyError(error) {
  const {
    code,
    message
  } = error

  if (errors[code]?.[message]) {
    return errors[code][message]
  }

  return 'Unknown error.'
}

export function showError(error) {
  const errMessage = prettyError(error)

  ElMessage.error(errMessage)
}