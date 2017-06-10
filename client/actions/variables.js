import { getAllOfTable } from '../scripts/api'

export const refreshVariables = (variables) => {
  return {
    type: 'GET_VARIABLES',
    variables
  }
}

export function getVariables (callback) {
  return (dispatch) => {
    return getAllOfTable('variable')
      .then((variables) => {
        dispatch(refreshVariables(variables))
        callback(variables)
      })
      .catch((err) => {
        throw err
      })
  }
}
