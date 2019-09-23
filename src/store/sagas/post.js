import { Post } from 'store/models';
import { all } from 'redux-saga/effects';
import * as api from 'api';
import { POST_PATH } from 'api/paths';

export default function* rootSaga() {
  yield all([
    ...Post.store().getSagas(api, POST_PATH, (res) => res.data),
  ]);
}
