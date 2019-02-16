import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface ISessionTypes {
  LOGIN: 'LOGIN'
  LOGIN_SUCCESS: 'LOGIN_SUCCESS'
  LOGIN_FAILURE: 'LOGIN_FAILURE'
  LOGOUT: 'LOGOUT'
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
  LOGOUT_FAILURE: 'LOGOUT_FAILURE'
  INCREMENT: 'INCREMENT'
  DECREMENT: 'DECREMENT'
}

export interface ILogin extends AnyAction {
  type: ISessionTypes['LOGIN']
  identifer: string
  password: string
}

export interface ILoginSuccess extends AnyAction {
  type: ISessionTypes['LOGIN_SUCCESS']
  tokens: IToken[]
}

export interface ILoginFailure extends AnyAction {
  type: ISessionTypes['LOGIN_FAILURE']
  error: string
  payload: {
    error: string
  }
}

export interface ILogout extends AnyAction {
  type: ISessionTypes['LOGOUT']
  tokens: IToken[]
}

export interface ILogoutSuccess extends AnyAction {
  type: ISessionTypes['LOGOUT_SUCCESS']
}

export interface ILogoutFailure extends AnyAction {
  type: ISessionTypes['LOGIN_FAILURE']
  error: string
}

export interface IIncrement extends AnyAction {
  type: ISessionTypes['INCREMENT']
}

export interface IDecrement extends AnyAction {
  type: ISessionTypes['DECREMENT']
}

interface ISessionActions {
  login(indentifier: string, password: string): ILogin
  loginSuccess(tokens: IToken[]): ILoginSuccess
  loginFailure(error: string): ILoginFailure
  logout(tokens: IToken[]): ILogout
  logoutSuccess(): ILoginSuccess
  logoutFailure(error: string): ILogoutFailure
  increment(): IIncrement
  decrement(): IDecrement
}

const { Types, Creators } = createActions<ISessionActions, ISessionTypes>({
  login: ['identifier', 'password'],
  loginSuccess: ['tokens'],
  loginFailure: ['error'],
  logout: ['tokens'],
  logoutSuccess: null,
  logoutFailure: ['error'],
  increment: null,
  decrement: null,
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IToken {
  value: string
  expiresIn?: number
}

interface ISession {
  fetchStatus: IFetchStatus
  tokens: IToken[] | undefined
  count: number
}

export type SessionType = Immutable.Immutable<ISession>

export const INITIAL_STATE: SessionType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  tokens: undefined,
  count: 0,
})

function resetFetchStatus(state: SessionType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: SessionType,
  fetching: boolean,
  method: string,
  error?: string,
) {
  return state.setIn(['fetchStatus'], {
    fetching,
    error,
    method,
  })
}

export const login = (state: SessionType): SessionType => {
  return setFetchStatus(state, true, 'login')
}

export const loginSuccess = (
  state: SessionType,
  { tokens }: { tokens: IToken[] },
): SessionType => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['tokens'], tokens)
}

export const loginFailure = (
  state: SessionType,
  { error }: { error: string },
): SessionType => {
  return setFetchStatus(state, false, 'login', error)
}

export const logout = (state: SessionType): SessionType => {
  return setFetchStatus(state, true, 'logout')
}

export const logoutSuccess = (state: SessionType): SessionType => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['tokens'], undefined)
}

export const logoutFailure = (
  state: SessionType,
  { error }: { error: string },
): SessionType => {
  return setFetchStatus(state, false, 'logout', error)
}

export const increment = (state: SessionType): SessionType => {
  return state.setIn(['count'], state.count + 1)
}

export const decrement = (state: SessionType): SessionType => {
  return state.setIn(['count'], state.count - 1)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [SessionTypes.LOGIN]: login,
  [SessionTypes.LOGIN_SUCCESS]: loginSuccess,
  [SessionTypes.LOGIN_FAILURE]: loginFailure,
  [SessionTypes.LOGOUT]: logout,
  [SessionTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [SessionTypes.LOGOUT_FAILURE]: logoutFailure,
  [SessionTypes.INCREMENT]: increment,
  [SessionTypes.DECREMENT]: decrement,
})
