interface GameCardProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameCard(data: GameCardProps) {
    return (
        <div title={data.title} className="relative rounded-lg overflow-hidden hover:opacity-70 transition">
            <img src={data.bannerUrl} alt="" />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{data.title}</strong>
                <span className="text-zinc-300 font-sm block">{data.adsCount} anúncio(s)</span>
            </div>
        </div>
    );
}