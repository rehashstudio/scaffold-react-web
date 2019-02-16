import configureStore from 'redux-mock-store'

import SessionActions, {
  INITIAL_STATE,
  IToken,
  reducer,
  SessionTypes,
} from '../SessionRedux'

const mockStore = configureStore()
const store = mockStore()

const dummyTokens: IToken[] = [
  {
    value: 'string',
    expiresIn: 1234,
  },
]

describe('Session actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions()
  })

  test('login', () => {
    store.dispatch(SessionActions.login('identifier', 'password'))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('loginSuccess', () => {
    store.dispatch(SessionActions.loginSuccess(dummyTokens))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('loginFailure', () => {
    store.dispatch(SessionActions.loginFailure('loginFailure error message'))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logout', () => {
    store.dispatch(SessionActions.logout(dummyTokens))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logoutSuccess', () => {
    store.dispatch(SessionActions.logoutSuccess())
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logoutFailure', () => {
    store.dispatch(SessionActions.logoutFailure('logoutFailure error message'))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('increment', () => {
    store.dispatch(SessionActions.increment())
    expect(store.getActions()).toMatchSnapshot()
  })

  test('decrement', () => {
    store.dispatch(SessionActions.decrement())
    expect(store.getActions()).toMatchSnapshot()
  })
})

describe('Session Reducer', () => {
  test('initial state', () => {
    const action = { type: 'DUMMY_ACTION' }
    expect(reducer(undefined, action)).toEqual(INITIAL_STATE)
  })

  test('returns correct state on login request', () => {
    const action = {
      type: SessionTypes.LOGIN,
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: true,
      error: undefined,
      method: 'login',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on login success', () => {
    const action = {
      type: SessionTypes.LOGIN_SUCCESS,
      tokens: dummyTokens,
    }
    const expectedState = INITIAL_STATE.setIn(['tokens'], dummyTokens)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on login failure', () => {
    const action = {
      type: SessionTypes.LOGIN_FAILURE,
      error: 'Login Failure error',
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: false,
      error: action.error,
      method: 'login',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout request', () => {
    const action = {
      type: SessionTypes.LOGOUT,
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: true,
      error: undefined,
      method: 'logout',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout success', () => {
    const action = {
      type: SessionTypes.LOGOUT_SUCCESS,
      tokens: dummyTokens,
    }
    const expectedState = INITIAL_STATE.setIn(['tokens'], undefined)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout failure', () => {
    const action = {
      type: SessionTypes.LOGOUT_FAILURE,
      error: 'Logout Failure error',
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: false,
      error: action.error,
      method: 'logout',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on increment', () => {
    const action = {
      type: SessionTypes.INCREMENT,
    }
    const expectedState = INITIAL_STATE.setIn(['count'], 1)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on decrement', () => {
    const action = {
      type: SessionTypes.DECREMENT,
    }
    const expectedState = INITIAL_STATE.setIn(['count'], -1)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})
