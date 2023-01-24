import { useSearchParams } from 'react-router-dom';
import { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type UserContextProps = {
    children: ReactNode
}

export type User = {
    id?: string,
    avatar?: string,
    email?: string,
    username?: string,
    discriminator?: number,
    banner_color?: string,
    verified?: boolean 
}

type UserContextType = {
    userInfos: User,
    sairDaContaDiscord: () => void
    fazerLoginComContaDiscord: () => void
}

const initialValue = {
    userInfos: {},
    sairDaContaDiscord: () => {},
    fazerLoginComContaDiscord: () => {}
} 

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({children}: UserContextProps) => {
    const [params] = useSearchParams();

    const [userInfos, setUserInfos] = useState({});

    const fazerLoginComContaDiscord = () => {
        const access_token = Object.fromEntries([...params]).token;
        const user = localStorage.getItem("user");

        if(!user){
            axios.post(`http://localhost:3025/auth/discord/user/`, {access_token})
                .then(res => {
                    if(!res.data.error){
                        setUserInfos(res.data)
                        localStorage.setItem("user",  JSON.stringify(res.data));
                    }
                })
        }else {
            setUserInfos(JSON.parse(user))
        }

    }
        
    useEffect(() => {
        fazerLoginComContaDiscord();
    }, [])
    

    const sairDaContaDiscord = () => {
        setUserInfos({})
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ userInfos, sairDaContaDiscord, fazerLoginComContaDiscord }}>
            {children}
        </UserContext.Provider>
    )
}