import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import Immutable from 'seamless-immutable'

import { persistConfig } from '../Config/persistConfig'
import sagas from '../Sagas'
import { SessionType } from './SessionRedux'

interface IRootStateRaw {
  session: SessionType
}

export type RootState = Immutable.Immutable<IRootStateRaw>

export default () => {
  const rootReducer = combineReducers({
    session: require('./SessionRedux').reducer,
  })

  const middleware = []
  const enhancers = []

  if (process.env.REACT_APP_NOT_SECRET_CODE === 'development') {
    middleware.push(createLogger({ collapsed: true }))
  }

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware({})
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  sagaMiddleware.run(sagas)

  return {
    store,
    persistor,
  }
}
