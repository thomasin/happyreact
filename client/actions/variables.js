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
      .then((res) => {
        return dispatch(refreshVariables(res))
      })
      .catch((err) => {
        throw err
      })
  }
}
