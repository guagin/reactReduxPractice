import React from 'react';
import { Item } from 'store/reddit/state';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/SubjectOutlined';
import { useTypedSelector } from 'store/reducers';
// import { useTypedSelector } from 'store/reducers';

export function RedditListPage(input: { subreddit: string }) {
  const { subreddit } = input;

  const posts = useTypedSelector(state => state.postsBySubredditReducer)[
    subreddit
  ];

  const postList = () => {
    return posts.items.map(item => (
      <ListItem>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText>{item.data.title}</ListItemText>
      </ListItem>
    ));
  };

  return <List>{postList()}</List>;
}
