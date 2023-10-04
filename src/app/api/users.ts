import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handleGET(res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not found.' });
  }
}

const handleGET = async (res: NextApiResponse) => {
  const users = await prisma.users.findMany({
    select: {
      id: true
    }
  });
  res.status(200).json({ users });
};
