import { call, put } from 'redux-saga/effects'

import SessionActions from '../Redux/SessionRedux'

// login mock the response object is subject to change
export function* login(
  api: any,
  { identifier, password }: { identifier: string; password: string },
) {
  const response = yield call(api.login, identifier, password)

  if (response.ok) {
    yield put(SessionActions.loginSuccess(response.data.tokens))
  } else {
    yield put(SessionActions.loginFailure('Failed to Login. Please retry'))
  }
}
