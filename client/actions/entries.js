import { getAllOfTable } from '../scripts/api'

export const refreshEntries = (entries) => {
  return {
    type: 'GET_ENTRIES',
    entries
  }
}

export function getEntries () {
  return (dispatch) => {
    return getAllOfTable('entry')
      .then((entries) => {
        dispatch(refreshEntries(entries))
        return entries
      })
      .catch((err) => {
        throw err
      })
  }
}
