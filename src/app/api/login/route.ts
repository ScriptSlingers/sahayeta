// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { prisma } from '../../lib/prismadb';
// // import sha256 from 'crypto-js/sha256';
// // import { omit } from 'lodash';

// import { prisma } from '@sahayeta/app/lib/prismadb';

// // export default async function handle(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   if (req.method === 'POST') {
// //     await handlePOST(res, req);
// //   } else {
// //     res.status(405).json({ message: 'Method not found.' });
// //   }
// // }

// // const hashPassword = (password: string) => {
// //   return sha256(password).toString();
// // };

// // async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
// //   const user = await prisma.user.findFirst({
// //     where: { email: req.body.username },
// //     select: {
// //       id: true,
// //       email: true,
// //       password: true,
// //       role: true
// //     }
// //   });
// //   if (user && user.password === hashPassword(req.body.password)) {
// //     res.json(omit(user, 'password'));
// //   } else {
// //     console.log('Invalid credentials');
// //     res.status(400).end('Invalid credentials');
// //   }
// // }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;
//     const user = await prisma.user.findUnique({ where: { username } });

//     if (user && user.password === password) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
