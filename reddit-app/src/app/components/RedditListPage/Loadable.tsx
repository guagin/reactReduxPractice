/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const RedditListPage = lazyLoad(
  () => import('./index'),
  module => module.RedditListPage,
);
