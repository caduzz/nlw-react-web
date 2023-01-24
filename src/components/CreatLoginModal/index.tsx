import * as Dialog from '@radix-ui/react-dialog';

import { DiscordLogo } from 'phosphor-react';
import logoImg from '../../assets/logo-nlw-esports.svg';

export function CreateLoginModal() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <div className='w-100% flex justify-center '>
                    <img src={logoImg} alt="" />
                </div>
                <div className="mt-10">
                    <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-black">
                        Faça Login com discord
                    </h1>
                    <a
                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600 disabled:bg-violet-700"
                        href="https://discord.com/api/oauth2/authorize?client_id=1021186301732597850&redirect_uri=http%3A%2F%2Flocalhost%3A3025%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email"
                        >
                        <DiscordLogo size={24} /> Clique aqui
                    </a>
                    </div>
                </div>
            </Dialog.Content>

        </Dialog.Portal>
    );
}