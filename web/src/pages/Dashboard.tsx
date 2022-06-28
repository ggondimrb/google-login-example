import { useEffect, useState } from "react";
import { usePrivateApi } from "../usePrivateApi";
import { MatchData } from "../components/MatchData";
import { useAuth } from "../contexts/auth"
import { useNavigate } from "react-router-dom";

type MatchResponse = {
  data: MatchType[]
}

export type MatchType = {
  id: number;
  home_team: string;
  home_score: number;
  home_image: string;
  away_team: string;
  away_score: number;
  away_image: string;
  championship: string;
  match_hour: string;
}

export function Dashboard() {
  const privateApi = usePrivateApi();
  const { getUser, logout } = useAuth();
  const [matchs, setMatchs] = useState<MatchType[] | undefined>();
  let navigate = useNavigate();

  useEffect(() => {
    async function loadMatchs() {
      await privateApi.get('matchs/')
        .then((response: MatchResponse) => {
          setMatchs(response.data)
        })
        .catch(error => {
          alert('Erro ao carregar partidas.');
          logout();
          navigate('/');
        })
    }

    loadMatchs();

  }, [privateApi])

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="h-screen hidden lg:block shadow-lg relative w-80">
          <div className="bg-white h-full dark:bg-gray-700">
            <div className="flex items-center justify-start pt-6 ml-8">
              <p className="font-bold dark:text-white text-xl">
                Menu
              </p>
            </div>
            <nav className="mt-6">
              <div>
                <a className="w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500" href="#">
                  <span className="text-left">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z">
                      </path>
                    </svg>
                  </span>
                  <span className="mx-2 text-sm font-normal">
                    Ingressos
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full h-16 z-40 flex items-center justify-between">
            <div className="block lg:hidden ml-6">
              <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
                <svg width="20" height="20" className="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                  </path>
                </svg>
              </button>
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
              <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
                <button className="flex p-2 items-center rounded-full text-gray-400 hover:text-gray-700 bg-white shadow text-md">
                  <svg width="20" height="20" className="" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                    </path>
                  </svg>
                </button>
                <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md">
                  <svg width="20" height="20" className="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z">
                    </path>
                  </svg>
                </button>
                <span className="w-1 h-8 rounded-lg bg-gray-200">
                </span>
                <a href="#" className="block relative">
                  <img alt="profil" src={getUser()?.picture} className="mx-auto object-cover rounded-full h-10 w-10 " />
                </a>
                <button className="flex items-center text-gray-500 dark:text-white text-md">
                  {getUser()?.first_name}
                  <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </header>
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
              Olá, {getUser()?.first_name}
            </h1>
            <h2 className="text-md text-gray-400 py-2">
              Veja os últimos ingressos comprados
            </h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-400 text-md border-gray-300 border px-4 py-2 rounded-tl-sm rounded-bl-full rounded-r-full">
                <svg width="20" height="20" fill="currentColor" className="mr-2 text-gray-400" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z">
                  </path>
                </svg>
                Último mês
                <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                  </path>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              {matchs?.map(match => {
                return (
                  <MatchData key={match.id} match={match} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}