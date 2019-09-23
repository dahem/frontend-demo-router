import { all } from 'redux-saga/effects';
import post from './post';
// import { Post } from 'store/models';
// import * as api from 'api';
// import { POST_PATH } from 'api/paths';

export default function* rootSaga() {
  yield all([
    // Post.store().basicSagas(api, POST_PATH, (res) => res.data),
    post(),
  ]);
}
