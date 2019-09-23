import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import history from 'routes/history';
import appSagas from './sagas';
import appReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

// redux form, notification, DialogsContext, redux-router
const useLogger = true;
const excludeLogger = (type) => type.startsWith('@');

const loggerMiddleware = createLogger({
  predicate: (_, action) => useLogger && !excludeLogger(action.type),
});

function rootReducer() {
  const modelsReducer = combineReducers({
    router: connectRouter(history),
    app: appReducers,
  });

  return (state, action) => modelsReducer(state, action);
}

const store = createStore(
  rootReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      loggerMiddleware,
    ),
  ),
);

sagaMiddleware.run(appSagas);

export default store;
