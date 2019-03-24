import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools-sp';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const composeEnhancers = composeWithDevTools({ realtime: true });

const persistConfig = {
  timeout: null,
  key:'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(
    persistedReducer,
    composeEnhancers(
    applyMiddleware(thunk)
  )
)
export const persistor = persistStore(store)


