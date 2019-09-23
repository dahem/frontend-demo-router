import { Post } from 'store/models';

export default (state = { value: 0, collection: [] }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        value: state.value + 1,
      };
    }

    default:
      return Post.store().basicReducers()(state, action);
  }
};
