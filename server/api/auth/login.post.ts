// server/api/auth/login.post.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (email === 'user@example.com' && password === 'password123') {
    return {
      token: 'mock-jwt-token-for-user@example.com',
      user: {
        id: 1,
        email: 'user@example.com',
        name: 'Usuário Teste',
      },
      message: 'Login realizado com sucesso!',
    };
  } else {
    event.res.statusCode = 401;
    return {
      message: 'Credenciais inválidas.',
    };
  }
});