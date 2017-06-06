import { getAllOfTable } from '../scripts/api'

export const refreshVariables = (variables) => {
  return {
    type: 'GET_VARIABLES',
    variables
  }
}

export function getVariables () {
  return (dispatch) => {
    return getAllOfTable('variable')
      .then((variables) => {
        return dispatch(refreshVariables(variables))
      })
      .catch((err) => {
        throw err
      })
  }
}
