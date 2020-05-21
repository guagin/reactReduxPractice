import React, { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Collapse,
} from '@material-ui/core';
import { PostBySubreddit } from 'store/reddit/state';
import SubjectIcon from '@material-ui/icons/SubjectOutlined';
import { PostContent } from './PostContent';

export const PostList = (posts: PostBySubreddit) => {
  const [showContent, setShwoContent] = useState<{ [index: number]: boolean }>(
    {},
  );

  const handleClick = (index: number) => {
    const isShown = showContent[index];
    setShwoContent({
      ...showContent,
      [index]: !isShown,
    });
  };

  if (posts) {
    const list = posts.items.map((item, index) => (
      <>
        <ListItem
          button
          onClick={() => {
            handleClick(index);
          }}
        >
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText>{item.data.title}</ListItemText>
        </ListItem>
        <ListItem>
          <Collapse in={showContent[index]} timeout="auto" unmountOnExit>
            <ListItemText>
              <PostContent post={item} />
            </ListItemText>
          </Collapse>
        </ListItem>
      </>
    ));

    return <List>{list}</List>;
  }
  return <></>;
};
