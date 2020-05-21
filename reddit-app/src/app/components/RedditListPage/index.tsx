import React, { useState } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';

import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { FetchPosts, SelectSubredditActionCreator } from 'store/reddit/action';
import { PostList } from './PostsList';

export function RedditListPage(input: { subreddit: string }) {
  const { subreddit } = input;
  const dispatch = useDispatch();

  const post = useTypedSelector(state => state.postsBySubredditReducer)[
    subreddit
  ];

  const [subredditInput, setSubredditInput] = useState(subreddit);

  const handleSubredditChange = (value: string) => {
    setSubredditInput(value);
  };

  const handleOnEnter = () => {
    dispatch(SelectSubredditActionCreator(subredditInput));
    dispatch(FetchPosts(subredditInput));
  };

  const loading = () => {
    if (post && post.isFetching) {
      return <CircularProgress />;
    }
    return <></>;
  };

  return (
    <>
      <TextField
        id="subreddit"
        value={subredditInput}
        placeholder="subreddit"
        label="subreddit"
        onChange={event => {
          handleSubredditChange(event.target.value);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter') handleOnEnter();
        }}
      />
      {loading()}
      {PostList(post)}
    </>
  );
}
