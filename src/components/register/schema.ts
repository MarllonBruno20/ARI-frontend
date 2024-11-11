import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const passwordRule = z
  .string({
    required_error: "O campo senha é obrigatório!",
  })
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres!" })
  .regex(passwordValidation, {
    message: "Senha inválida!",
  });

export const registerSchema = z
  .object({
    nome: z
      .string({
        required_error: "O campo nome é obrigatório!",
      })
      .min(5, { message: "O nome deve ter no mínimo 5 caracteres!" }),
    data_nascimento: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      },
      z.date({
        required_error: "O campo data de nascimento é obrigatório!",
      })
    ),
    email: z.string().email({ message: "O campo e-mail é obrigatório!" }),
    senha: passwordRule,
    confirmacaoSenha: passwordRule,
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não conferem!",
    path: ["confirmPassword"],
  });
