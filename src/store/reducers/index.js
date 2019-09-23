import { combineReducers } from 'redux';
// import { Post } from 'store/models';
import counter from './counter';
import post from './post';
import session from './session';

export default combineReducers({
  counter,
  post,
  session,
  // post: Post.store().basicReducers({ collection: [] }),
});
