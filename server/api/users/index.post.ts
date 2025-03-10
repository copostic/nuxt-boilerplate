import { z } from 'zod';
import bcrypt from 'bcryptjs';
import supabase from '~/server/utils/supabase';

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = userSchema.parse(body);

    const { error: countError, count } = await supabase
      .from('users')
      .select('email', { count: 'exact', head: true })
      .eq('email', validatedData.email);

    if (countError) {
      return createError({
        statusCode: 400,
        message: countError.message,
      });
    }

    if (count > 0) {
      return createError({
        statusCode: 409,
        message: 'Email already in use',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Insert user into Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('id, email, name, created_at, updated_at')
      .single();

    if (error) {
      return createError({
        statusCode: 400,
        message: error.message,
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return createError({
        statusCode: 400,
        message: error.errors.map(e => e.message).join(', '),
      });
    }

    return createError({
      statusCode: 500,
      message: 'An error occurred while creating the user',
    });
  }
});
