export interface Tag {
  _id: string;
  title: string;
}

export interface UserRef {
  _id: string;
  username: string;
}

export interface ContentItem {
  link: string;
  tags: Tag[];
  title: string;
  type: string;
  userId: UserRef;
  __v: number;
  _id: string;
}

export interface ContentResponse {
  content: ContentItem[];
}