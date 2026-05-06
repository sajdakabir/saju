import { notFound } from 'next/navigation';
import { getPost, getPublishedPosts } from '@/lib/posts';
import PostClient from './PostClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return <PostClient post={post} />;
}
