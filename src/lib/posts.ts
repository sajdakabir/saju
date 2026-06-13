import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: 'draft' | 'published';
}

export interface TocItem {
  text: string;
  level: number;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

function toIsoDate(raw: unknown): string {
  if (!raw) return '';
  if (raw instanceof Date) {
    const yyyy = raw.getUTCFullYear();
    const mm = String(raw.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(raw.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(raw).slice(0, 10);
}

function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCode = false;

  for (const line of content.split('\n')) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    items.push({ text, level, slug: slugger.slug(text) });
  }

  return items;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: toIsoDate(data.date),
        status: (data.status === 'published' ? 'published' : 'draft') as 'draft' | 'published',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPublishedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.status === 'published');
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: toIsoDate(data.date),
    status: (data.status === 'published' ? 'published' : 'draft') as 'draft' | 'published',
    content,
    toc: extractToc(content),
  };
}
