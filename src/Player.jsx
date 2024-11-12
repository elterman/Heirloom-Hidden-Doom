import { useAtom } from 'jotai';
import Coin from './Images/Coin.webp';
import Trap from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import { a_over } from './atoms';
import { _11, LOST, WON } from './const';

const Player = ({ style }) => {
    const [over] = useAtom(a_over);

    const gridArea = _11;
    const src = over === WON ? Coin : over === LOST ? Trap :Flag;

    const renderAvatar = () => {
        const width = 90;

        return <div className='avatar'>
            <img src={src} alt='avatar' width={width} style={{ gridArea, zIndex: 1 }} />
        </div>;
    };

    return <div className='player' style={{ ...style }}>
        {renderAvatar()}
    </div>;
};

export default Player;