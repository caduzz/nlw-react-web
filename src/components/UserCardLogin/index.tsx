import { User } from '../../context/UserContext';

interface UserProps {
    user: User;
    sair: () => void
}

export function UserCardLogin({ user, sair }:UserProps) {
  return (
    <div>   
        <div 
            title='Sair'
            onClick={sair} 
            className='fixed cursor-pointer p-2 bg-zinc-900 text-white top-2 left-2 rounded flex flex-row items-center justify-center border-l-2 hover:border-l-8 transition-all'
            style={{
                borderColor: user.banner_color
            }}
        >
            <img 
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=20`} 
                className="mr-2 rounded-sm"
            />
            <p className="mr-1">
                {user.username}#{user.discriminator}
            </p>
            
        </div>
      </div>
  );
}