import { getPublishedPosts } from '@/lib/posts';
import PostsClient from './PostsClient';

export default function PostsPage() {
  const posts = getPublishedPosts();
  return <PostsClient posts={posts} />;
}
