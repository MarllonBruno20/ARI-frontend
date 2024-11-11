import { z } from "zod";

const passwordRule = z.string({
  required_error: "O campo senha é obrigatório!",
});

export const loginSchema = z.object({
  email: z.string().email({ message: "O campo e-mail é obrigatório!" }),
  senha: passwordRule,
});
