import { FormEvent, useContext, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog'; 
import * as Checkbox from '@radix-ui/react-checkbox'; 
import * as Select from '@radix-ui/react-select'; 
import * as ToggleGroup from '@radix-ui/react-toggle-group'; 

import { Check, GameController } from 'phosphor-react';

import { Input } from '../Form/Input';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const {userInfos} = useContext(UserContext)

    const [games, setGames] = useState<Game[]>([]);

    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    useEffect(()=> {
        axios('http://localhost:3025/games')
            .then(res => setGames(res.data))
    }, [])

    async function handleCreateAd (event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData)

        if(!data.name){
            return
        }
        try {
            await axios.post(`http://localhost:3025/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: userInfos ? `${userInfos.username}#${userInfos.discriminator}` : data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            console.log('ad criado com sucesso')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
            </Dialog.Title>

            <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">Qual o game?</label>
                    <select
                        name="game"
                        id="game" 
                        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                        defaultValue=""
                    >
                        <option disabled>Selecione o game que deseja jogar</option>
                        {games.map(game => (
                            <option value={game.id} key={game.id} >{game.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Seu nome (ou nickname)</label>
                    <Input 
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Como te chamam dentro do game?"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    {!userInfos.username ?
                        <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                        :
                        <Input
                            name="discord" 
                            value={`${userInfos.username}#${userInfos.discriminator}`}
                            id="discord" 
                            disabled
                            type="text"
                            placeholder="Usuario#0000" 
                        />
                    }
                </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays">Quando costuma jogar?</label>

                        <ToggleGroup.Root 
                            className="grid grid-cols-4 gap-2"
                            type="multiple"
                            value={weekDays}
                            onValueChange={setWeekDays}
                        >

                            <ToggleGroup.Item 
                                value="0"
                                title="Domingo"
                                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >D</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="1"
                                title="Segunda"
                                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >S</ToggleGroup.Item>
                            <ToggleGroup.Item 
                                value="2"
                                title="Terça"
                                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >T</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="3"
                                title="Quarta"
                                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >Q</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="4"
                                title="Quinta"
                                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >Q</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="5"
                                title="Sexta"
                                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >S</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="6"
                                title="Sábado"
                                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            >S</ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hourStart">Qual horário do dia</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                            <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm items-center"> 
                    <Checkbox.Root 
                        className="w-6 h-6 p-1 rounded bg-zinc-900"
                        onCheckedChange={(checked) => {
                            checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
                        }}
                    >
                        <Checkbox.Indicator>
                            <Check className='w-4 h-4 text-emerald-400'/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    Costumo me conectar ao chat de voz
                </div>
                
                <footer className='mt-4 flex justify-end gap-4'>
                    <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                    <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        type="submit"
                    >
                        <GameController size={24} /> Encontrar Duo
                    </button>
                </footer>
            </form>
            </Dialog.Content>

        </Dialog.Portal>
    );
}