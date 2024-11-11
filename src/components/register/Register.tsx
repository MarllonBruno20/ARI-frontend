import { useForm, type SubmitHandler } from "react-hook-form";
import { RegisterFormSchema } from "./types";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../commons/FormErrorsMessage";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "../../api/user/hooks";
import { AxiosError } from "axios";
import { Snackbar } from "@mui/material";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: createUser } = useCreateUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    const { nome, email, senha } = data;

    try {
      const data_nascimento = new Date(data.data_nascimento);

      await createUser({
        nome,
        email,
        senha,
        data_nascimento,
      });

      navigate("/login");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        setError("email", {
          type: "manual",
          message: "Email ja existe",
        });
      } else {
        setOpenSnackBar(true);
      }
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-4 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center">
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
              Criar conta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Fulano da Silva"
                    {...register("nome")}
                  />
                  {errors.nome?.message && (
                    <ErrorsMessage
                      message={errors.nome.message}
                      className="mt-1"
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="birthdate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Data de nascimento
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("data_nascimento")}
                  />
                  {errors.data_nascimento?.message && (
                    <ErrorsMessage
                      message={errors.data_nascimento.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Seu e-mail
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("confirmacaoSenha")}
                  />
                  {errors.confirmacaoSenha?.message && (
                    <ErrorsMessage
                      message={errors.confirmacaoSenha.message}
                      className="mt-1"
                    />
                  )}
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    className="rounded-md hover:text-green-300 p-2 text-xs transition-all ease-in-out text-green-400 font-medium absolute inset-y-0 end-1"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Criar conta
              </button>
              <p className="text-sm font-light text-gray-500 text-center">
                Você já tem uma conta?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Entre aqui
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackBar(false)}
        message="Erro ao criar conta."
      />
    </section>
  );
}
