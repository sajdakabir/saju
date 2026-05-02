import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

async function getCollection() {
  const client = await clientPromise;
  return client.db('saju').collection('likes');
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const col = await getCollection();
  const doc = await col.findOne({ slug: params.slug });
  return NextResponse.json({ count: doc?.count ?? 0 });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { action } = await req.json();
  const col = await getCollection();

  const inc = action === 'unlike' ? -1 : 1;

  const result = await col.findOneAndUpdate(
    { slug: params.slug },
    { $inc: { count: inc } },
    { upsert: true, returnDocument: 'after' }
  );

  const count = Math.max(0, result?.count ?? 0);

  // clamp to 0 if we went negative
  if (count === 0 && inc === -1) {
    await col.updateOne({ slug: params.slug }, { $set: { count: 0 } });
  }

  return NextResponse.json({ count });
}
