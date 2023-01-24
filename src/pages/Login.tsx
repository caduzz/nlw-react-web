import { CreateAdModal } from '../components/CreateAdModal';

import { useContext, useEffect, useState } from 'react';

import { DiscordLogo } from 'phosphor-react';
import logoImg from '../assets/logo-nlw-esports.svg';

import { UserContext }from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { userInfos, fazerLoginComContaDiscord} = useContext(UserContext)

  const navigate = useNavigate();

  const hendleHome = () => {
    navigate('/')  
  }

  return (
    <div className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] h-[372px] shadow-lg shadow-black/25'>
      <div>
        <div className='w-100% flex justify-center '>
          <img src={logoImg} alt="" />
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-black">
              Ola, <span style={{color: userInfos.banner_color}}>{userInfos.username}</span> seja bem vindo
            </h1>
            <button onClick={hendleHome} className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600 disabled:bg-violet-700">
                <DiscordLogo size={24} /> Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login
