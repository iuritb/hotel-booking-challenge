// server/api/auth/register.post.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  if (!name || !email || !password) {
    event.res.statusCode = 400;
    return {
      message: 'Nome, email e senha são obrigatórios para o registro.',
    };
  }

  if (email === 'existing@example.com') {
    event.res.statusCode = 409; 
    return {
      message: 'Email já registrado.',
    };
  }

  return {
    token: `mock-jwt-token-for-${email}`,
    user: {
      id: Math.floor(Math.random() * 1000) + 2, 
      email: email,
      name: name,
    },
    message: 'Registro realizado com sucesso! Você já está logado.',
  };
});