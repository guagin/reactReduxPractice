import { Reducer } from 'react';
import { SelectSubredditAction, RedditPostActions } from './action';
import { PostBySubreddit } from './state';

export const selectSubredditReducer: Reducer<string, SelectSubredditAction> = (
  state = 'reactjs',
  action,
) => {
  switch (action.type) {
    case 'SelectSubreddit':
      return action.subreddit;
    default:
      return state;
  }
};

const postsReducer: Reducer<PostBySubreddit, RedditPostActions> = (
  state = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case 'InvalidateSubreddit':
      return {
        ...state,
        didInvalidate: true,
      };
    case 'RequestPostsAction':
      return {
        ...state,
        isFetching: true,
      };
    case 'ReceivePosts':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
      };
  }
};

export const postsBySubredditReducer: Reducer<
  {
    [index: string]: PostBySubreddit;
  },
  RedditPostActions
> = (state = {}, action) => {
  switch (action.type) {
    case 'InvalidateSubreddit':
    case 'RequestPostsAction':
    case 'ReceivePosts':
      return {
        ...state,
        [action.subreddit]: postsReducer(state[action.subreddit], action),
      };
    default:
      return state;
  }
};
