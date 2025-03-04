import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
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

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },

  });

  if (existingUser) {
    return createError({
      statusCode: 409,
      message: 'Email already in use',
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  return prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      name: body.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
});
