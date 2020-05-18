export interface RedditState {
  selectedSubreddit: string;
  postBySubreddit: {
    [index: string]: PostBySubreddit;
  };
}

export interface PostBySubreddit {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated: Date;
  items: Item[];
}

export interface Item {
  id: number;
  title: string;
}
