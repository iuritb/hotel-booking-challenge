import { d as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;
  if (!name || !email || !password) {
    event.res.statusCode = 400;
    return {
      message: "Nome, email e senha s\xE3o obrigat\xF3rios para o registro."
    };
  }
  if (email === "existing@example.com") {
    event.res.statusCode = 409;
    return {
      message: "Email j\xE1 registrado."
    };
  }
  return {
    token: `mock-jwt-token-for-${email}`,
    user: {
      id: Math.floor(Math.random() * 1e3) + 2,
      email,
      name
    },
    message: "Registro realizado com sucesso! Voc\xEA j\xE1 est\xE1 logado."
  };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
