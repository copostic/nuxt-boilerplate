import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '~/lib/prisma';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user) {
    return createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const body = await readBody(event);

  const schema = z.object({
    name: z.string().min(2).optional(),
    password: z.string().min(8).optional(),
  });

  try {
    schema.parse(body);
  }
  catch (error) {
    return createError({
      statusCode: 400,
      message: error.message || 'Invalid input data',
    });
  }

  const updateData: { name?: string; password?: string } = {};

  if (body.name) {
    updateData.name = body.name;
  }

  if (body.password) {
    updateData.password = await bcrypt.hash(body.password, 10);
  }

  console.log(session);
  return prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
});
