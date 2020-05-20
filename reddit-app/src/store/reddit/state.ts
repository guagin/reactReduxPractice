export interface RedditState {
  selectedSubreddit: string;
  postBySubreddit: {
    [index: string]: PostBySubreddit;
  };
}

export interface PostBySubreddit {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated: number;
  items: Item[];
}

export interface Item {
  id: number;
  data: {
    title: string;
    selftext: string;
  };
}
