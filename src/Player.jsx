import { useAtom } from 'jotai';
import Coin from './Images/Coin.webp';
import Trap from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import { a_over } from './atoms';
import { LOST, WON } from './const';

const Player = () => {
    const [over] = useAtom(a_over);

    const gridArea = '1/2';
    const src = over === WON ? Coin : over === LOST ? Trap : Flag;
    const scale = over === LOST ? 8 / 9 : 1;
    const style = over === LOST ? { transform: `scale(${scale})`, filter: 'sepia(0.7)' } : {};

    return <img src={src} alt='avatar' width={90} style={{ gridArea, zIndex: 1, ...style }} />;
};

export default Player;