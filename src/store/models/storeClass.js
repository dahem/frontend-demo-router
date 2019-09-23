import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getSaga(args, action) {
  const [api, method, path, superClass, fnRequest] = args;
  try {
    const data = action.payload;
    let payload = yield call(api[method], path, data);
    if (fnRequest !== null) {
      payload = fnRequest(payload);
    }
    yield put({ type: superClass.getDefinitions(method, { ok: true }), payload });
  } catch (error) {
    yield put({ type: superClass.getDefinitions(method, { fail: true }), error });
  }
}

export default class StoreClass {
  constructor(singular, plural) {
    this.singular = singular;
    this.plural = !plural ? `${singular}s` : plural;
    this.methods = ['fetchMany', 'fetchOne', 'create', 'delete', 'update'];
  }

  getDefinitions(type, options = {}) {
    const base = {
      fetchMany: `FETCH_${this.plural.toUpperCase()}`,
      fetchOne: `FETCH_${this.singular.toUpperCase()}`,
      create: `CREATE_${this.singular.toUpperCase()}`,
      delete: `REMOVE_${this.singular.toUpperCase()}`,
      update: `UPDATE_${this.singular.toUpperCase()}`,
    };
    if (!options.ok && options.fail) return `${base[type]}__REJECTED`;
    if (options.ok && !options.fail) return `${base[type]}_FULFILLED`;
    return base[type];
  }

  getDefinitionsReducers(options = {}) {
    return this.methods.map((x) => (
      this.getDefinitions(x, options)
    ));
  }

  fetchMany(filter) {
    return {
      type: this.getDefinitions('fetchMany'),
      payload: filter,
    };
  }

  fetchOne(id) {
    return {
      type: this.getDefinitions('fetchOne'),
      payload: id,
    };
  }

  create(rawData) {
    return {
      type: this.getDefinitions('create'),
      payload: rawData,
    };
  }

  delete(id) {
    return {
      type: this.getDefinitions('delete'),
      payload: id,
    };
  }

  update(id, rawData) {
    return {
      type: this.getDefinitions('update'),
      payload: { id, rawData },
    };
  }

  getReducer(action, state) {
    switch (action.type) {
      case this.getDefinitions('fetchMany', { ok: true }): {
        return {
          ...state,
          collection: action.payload,
        };
      }

      case this.getDefinitions('fetchOne', { ok: true }): {
        return {
          ...state,
          collection: action.payload,
        };
      }

      case this.getDefinitions('create', { ok: true }): {
        return {
          ...state,
          collection: action.payload,
        };
      }

      case this.getDefinitions('delete', { ok: true }): {
        return {
          ...state,
          collection: action.payload,
        };
      }

      case this.getDefinitions('update', { ok: true }): {
        return {
          ...state,
          collection: action.payload,
        };
      }

      default:
        return state;
    }
  }

  basicReducers(baseState) {
    const baseStateSanitized = !baseState ? { collection: {} } : baseState;
    return (state = baseStateSanitized, action) => this.getReducer(action, state);
  }

  * basicSagas(api, path, fnRequest = null) {
    const takeSaga = (method) => takeLatest(
      this.getDefinitions(method),
      getSaga,
      [api, method, path, this, fnRequest],
    );
    return yield all(this.methods.map((method) => takeSaga(method)));
  }

  getSagas(api, path, fnRequest = null) {
    const takeSaga = (method) => takeLatest(
      this.getDefinitions(method),
      getSaga,
      [api, method, path, this, fnRequest],
    );
    return this.methods.map((method) => takeSaga(method));
  }
}
