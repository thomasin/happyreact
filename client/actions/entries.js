import { getAllOfTable } from '../scripts/api'

export const refreshEntries = (entries) => {
  return {
    type: 'GET_ENTRIES',
    entries
  }
}

export function getEntries () {
  return (dispatch) => {
    return getAllOfTable('entry', (err, res) => {
      if (!err) dispatch(refreshEntries(res.body.entries))
    })
  }
}
