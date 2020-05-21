import React, { useState } from 'react';
import {
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  TextField,
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/SubjectOutlined';
import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { FetchPosts, SelectSubredditActionCreator } from 'store/reddit/action';

export function RedditListPage(input: { subreddit: string }) {
  const { subreddit } = input;
  const dispatch = useDispatch();

  const posts = useTypedSelector(state => state.postsBySubredditReducer)[
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

  const postList = () => {
    if (posts) {
      const list = posts.items.map(item => (
        <ListItem>
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText>{item.data.title}</ListItemText>
        </ListItem>
      ));

      return <List>{list}</List>;
    }
    return <></>;
  };

  const loading = () => {
    if (posts && posts.isFetching) {
      return <CircularProgress />;
    }
    return <></>;
  };

  return (
    <>
      {/* <form noValidate autoComplete="off"> */}
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
      {/* </form> */}
      {loading()}
      {postList()}
    </>
  );
}
