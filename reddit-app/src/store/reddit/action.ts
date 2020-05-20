import { Action, ActionCreator, ThunkAction, Dispatch } from '@reduxjs/toolkit';
import { Item } from './state';

export interface SelectSubredditAction extends Action<'SelectSubreddit'> {
  subreddit: string;
}

export interface InvalidateSubredditAction
  extends Action<'InvalidateSubreddit'> {
  subreddit: string;
}

export interface RequestPostsAction extends Action<'RequestPostsAction'> {
  subreddit: string;
}

export interface ReceivePostsAction extends Action<'ReceivePosts'> {
  subreddit: string;
  posts: Item[];
}

export type RedditPostActions =
  | InvalidateSubredditAction
  | RequestPostsAction
  | ReceivePostsAction;

export const SelectSubredditActionCreator: ActionCreator<SelectSubredditAction> = (
  subreddit: string,
) => {
  return {
    subreddit,
    type: 'SelectSubreddit',
  };
};

export const InvalidateSubredditActionCreator: ActionCreator<InvalidateSubredditAction> = (
  subreddit: string,
) => {
  return {
    subreddit,
    type: 'InvalidateSubreddit',
  };
};

export const RequestPostsActionCreator: ActionCreator<RequestPostsAction> = (
  subreddit: string,
) => {
  return {
    type: 'RequestPostsAction',
    subreddit,
  };
};

export const ReceivePostsActionCreator: ActionCreator<ReceivePostsAction> = (
  subreddit: string,
  posts: Item[],
) => {
  return {
    type: 'ReceivePosts',
    subreddit,
    posts,
  };
};

export const FetchPosts: ActionCreator<ThunkAction<
  Promise<RedditPostActions>,
  Item[],
  string,
  RedditPostActions
>> = (subreddit: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(RequestPostsActionCreator(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        error => console.log(`An error occurred.`, error),
      )
      .then(json =>
        dispatch(ReceivePostsActionCreator(subreddit, json.data.children)),
      );
  };
};
