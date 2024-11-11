import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { LoginFormSchema } from "./types";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../commons/FormErrorsMessage";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/auth/hook";
import { useAuth } from "../../providers/auth-provider/hook";
import type { AxiosError } from "axios";
import { Snackbar } from "@mui/material";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: handleLogin } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const { email, senha } = data;

    try {
      const result = await handleLogin({ email, senha });

      setToken(result.token);
      navigate("/home");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return setError("email", {
          type: "manual",
          message: "Credenciais inválidas, tente novamente!",
        });
      }

      return (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackBar(false)}
          message="Erro ao fazer login"
        />
      );
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-4 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mt-16">
          <Link to="/home">
            <img
              className="w-[6rem] h-[6rem]"
              src="./img/logo-atual.png"
              alt="logo"
            />
          </Link>
          <span className="text-3xl font-bold text-purple-700">ARI</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Entre na sua conta
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="nome@email.com"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <ErrorsMessage
                    message={errors.email.message}
                    className="mt-1"
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("senha")}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="rounded-md hover:text-green-300 p-2 text-xs transition-all ease-in-out text-green-400 font-medium absolute inset-y-0 end-1"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="flex gap-2">
                  {errors.senha?.message && (
                    <ErrorsMessage
                      message={errors.senha.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-blue-600 hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-secondary"
              >
                Entrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não tem uma conta?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 mx-1"
                >
                  Cadastrar-se
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
