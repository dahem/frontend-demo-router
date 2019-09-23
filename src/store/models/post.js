import { clearObject } from 'helpers/object';
import StoreClass from './storeClass';

export default class Post {
  constructor(obj) {
    if (obj) {
      Object.assign(this, clearObject(obj));
    }
  }

  static store() {
    const d = new StoreClass('post');
    return d;
  }
}
