"use client";
import React, {useEffect, useState} from "react"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authOptions, ICredentials } from "../utils/authOptions";
import { redirect, useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validationForm = yup.object().shape({
    email: yup.string().required("O Campo é obrigatorio!"),
    password: yup
      .string()
      .min(8, "A senha deve ter no minimo 8 digitos")
      .required("O Campo é obrigatorio!"),
  });

  const submitForm = async (data: ICredentials) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
    setIsLoading(false);
    requireAuth(result);
  };

  function requireAuth(result: any) {
    if (result?.url) {
      console.log('resultado do loginnn', result);
      return router.replace(`/dashboard`)
    } else {
      let message = "Erro ao solicitar a autenticação";
      if (result?.status === 401) {
        message = "Usuario ou senha invalido";
      };
    }
  }

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(validationForm),
  });

  return (
    <div className="h-screen md:flex">
      <div
        className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-600 to-blue-950 i justify-around items-center hidden">
        <div className="flex justify-center items-center flex-col">
          <picture>
            <img
              className="w-60 h-auto"
              src="/logo.png"
              alt="condo help"
            />
          </picture>
          <p className="text-white mt-1">Tiago inventa um textinho pra colocar aqui</p>
          <Link
            href={'http://condohelpdf.com.br/'}
            target={"_blank"}
          >
            <button type="submit" className="block bg-white text-blue-600 mt-4 py-2 px-4 rounded-2xl font-bold mb-2">Saiba mais...</button>
          </Link>
        </div>
        {/* <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div> */}
      </div>
      <div className="flex md:w-1/2 justify-center  items-center bg-white sm:items-center flex-col h-screen">
        <div className="w-[60%] max-[767px]:w-[80%] bg-white">
          <div className="hidden max-[767px]:flex w-full bg-white justify-center items-center mb-10">
            <picture>
              <img
                className="w-60 h-auto"
                src="/logo_login_full.png"
                alt="condo help"
              />
            </picture>
          </div>
          <form className="bg-white"
            onSubmit={handleSubmit(submitForm)}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Ola!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Seja bem vindo.</p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {formState.errors.email && (
              <p
                style={{ color: "red" }}
                className="text-sm text-red-500 mt-2 ml-2 hover:none"
              >
                {formState.errors.email.message}
              </p>
            )}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd" />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
            </div>
            {formState.errors.password && (
              <p style={{ color: "red" }} className="text-sm mt-2 ml-2">
                {formState.errors.password.message}
              </p>
            )}
            <button type="submit" className="flex justify-center w-full bg-blue-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
              {(isLoading && (
                <AiOutlineLoading className="animate-spin" size={20} />
              )) ||
                "Entrar"
              }
            </button>
            <div className="flex justify-between items-center">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Lembrar senha?</span>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Criar usuário</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
