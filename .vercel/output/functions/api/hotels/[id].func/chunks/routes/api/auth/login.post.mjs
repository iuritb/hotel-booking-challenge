import { d as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (email === "user@example.com" && password === "password123") {
    return {
      token: "mock-jwt-token-for-user@example.com",
      user: {
        id: 1,
        email: "user@example.com",
        name: "Usu\xE1rio Teste"
      },
      message: "Login realizado com sucesso!"
    };
  } else {
    event.res.statusCode = 401;
    return {
      message: "Credenciais inv\xE1lidas."
    };
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
