import React from 'react';
import { Item } from 'store/reddit/state';
import { Paper } from '@material-ui/core';

import { XmlEntities } from 'html-entities';

export const PostContent = (input: { post: Item }) => {
  const { post } = input;

  return (
    <Paper>
      <div
        dangerouslySetInnerHTML={{
          __html: XmlEntities.decode(post.data.selftext_html),
        }}
      ></div>
      {/* <div dangerouslySetInnerHTML={{ __html: 'First &middot; Second' }}></div> */}
    </Paper>
  );
};
