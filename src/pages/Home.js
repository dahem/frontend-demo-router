import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { increment } from 'store/actions/counter';
import { Post } from 'store/models';
import { ThemeContext } from 'store/contexts/theme';

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const counter = useSelector((state) => state.app.counter.value);
  const posts = useSelector((state) => state.app.post.collection);
  const user = useSelector((state) => state.app.session.user);
  const on = useDispatch();
  return (
    <div>
      {user.name}
      {counter}
      <Button color="secondary" onClick={() => on(increment())}>send</Button>
      {posts.map((post) => (
        <div key={post.id}>
          <span>{post.body}</span>
        </div>
      ))}
      <Button color="primary" onClick={() => on(Post.store().fetchMany())}>send</Button>
      <Button color="primary" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>send</Button>
    </div>
  );
};

export default Home;
