import Avatar from './Images/Avatar.webp';
import Coin from './Images/Coin.webp';
import { _11 } from './const';

const Player = ({ player, style }) => {
    const gridArea = _11;
    let src = Avatar;

    if (player === 1) {
        src = Coin;
    }

    const renderAvatar = () => {
        const width = 55;

        return <div className='avatar'>
            <img src={src} alt='avatar' width={width} style={{ gridArea, zIndex: 1 }} />
        </div>;
    };

    return <div className='player' style={{ ...style }}>
        {renderAvatar()}
    </div>;
};

export default Player;