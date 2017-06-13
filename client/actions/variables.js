import { getAllOfTable } from '../scripts/api'

export const refreshVariables = (variables) => {
  return {
    type: 'GET_VARIABLES',
    variables
  }
}

export function getVariables (callback) {
  return (dispatch) => {
    return getAllOfTable('variable', (err, res) => {
      if (!err) {
        dispatch(refreshVariables(res.body.variables))
        callback(res.body.variables)
      }
    })
  }
}
