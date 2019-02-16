import { takeLatest } from 'redux-saga/effects'

import apiCreator from '../Services/api'
import { login } from './SessionSagas'

/* ------------- Types ------------- */

import { SessionTypes } from '../Redux/SessionRedux'

/* ------------- API ------------- */

const api = new apiCreator()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [takeLatest(SessionTypes.LOGIN, login, api)]
}
