import { useContext, useEffect, useState } from 'react';

import { GameCard } from '../components/GameCard';
import { CreateBannerAd } from '../components/CreateBannerAd';
import { CreateAdModal } from '../components/CreateAdModal';
import { UserCardLogin } from '../components/UserCardLogin';
import { CreateLoginModal } from '../components/CreatLoginModal';

import { UserContext } from '../context/UserContext';

import * as Dialog from '@radix-ui/react-dialog';

import axios from 'axios';

import logoImg from '../assets/logo-nlw-esports.svg';
import { DiscordLogo } from 'phosphor-react';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}

function Home() {
  const { userInfos, sairDaContaDiscord } = useContext(UserContext)

  const [games, setGames] = useState<Game[]>([]);

  useEffect(()=> {
    axios('http://localhost:3025/games')
      .then(res => {
        setGames(res.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo nlw eSports" />

      <h1 className="text-white text-6xl font-bold mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
      
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameCard 
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateBannerAd />

        <CreateAdModal />
      </Dialog.Root>
      <Dialog.Root>
        <CreateLoginModal/>

        {!userInfos.avatar ?
            <Dialog.Trigger>
            <button className="fixed p-2 bg-zinc-900 text-white top-2 left-2 rounded flex flex-row items-center justify-center hover:opacity-75 transition">
              Login <DiscordLogo size={20} className="ml-2" />
            </button>
          </Dialog.Trigger>
          :
          <UserCardLogin user={userInfos} sair={sairDaContaDiscord}/>
        }
        
      </Dialog.Root>
    </div>
  )
}


export default Home
