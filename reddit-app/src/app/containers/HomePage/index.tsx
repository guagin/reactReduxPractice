import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { FetchPosts } from 'store/reddit/action';
import { useTypedSelector } from 'store/reducers';
import { RedditListPage } from 'app/components/RedditListPage';

export function HomePage() {
  const subreddit = useTypedSelector(state => state.selectSubredditReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchPosts('reactjs'));
  });

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>

      <div>
        <RedditListPage subreddit={subreddit} />
      </div>
    </>
  );
}
