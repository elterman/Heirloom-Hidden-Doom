import Avatar from './Images/Avatar.webp';
import Back from './Images/Back.webp';
import Coin from './Images/Coin.webp';
import CoinAvatar from './Images/Coin Avatar.webp';
import DeadAvatar from './Images/Dead Avatar.webp';
import Death from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import Gold from './Images/Gold.webp';
import Pattern from './Images/Pattern.webp';
import Play from './Images/Play.webp';
import ResetStats from './Images/Reset Stats.webp';
import Hand from './Images/Hand.webp';
import TileFrame from './Images/Tile Frame.webp';
import TileFrameGreen from './Images/Tile Frame Green.webp';
import TileFramePink from './Images/Tile Frame Pink.webp';
import Title from './Images/Title.webp';
import Watch from './Images/Watch.webp';
import { START_PAGE } from './const';

const Preloader = (props) => {
    const { page: p = null } = props;

    return <div className='dummy' >
        {p === null && <img className='dummy' src={Pattern} alt='' />}
        {p === null && <img className='dummy' src={Play} alt='' />}
        {p === null && <img className='dummy' src={Title} alt='' />}
        {p === null && <img className='dummy' src={Watch} alt='' />}

        {p === START_PAGE && <img className='dummy' src={Avatar} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Back} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Coin} alt='' />}
        {p === START_PAGE && <img className='dummy' src={CoinAvatar} alt='' />}
        {p === START_PAGE && <img className='dummy' src={DeadAvatar} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Death} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Flag} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Gold} alt='' />}
        {p === START_PAGE && <img className='dummy' src={ResetStats} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Hand} alt='' />}
        {p === START_PAGE && <img className='dummy' src={TileFrame} alt='' />}
        {p === START_PAGE && <img className='dummy' src={TileFrameGreen} alt='' />}
        {p === START_PAGE && <img className='dummy' src={TileFramePink} alt='' />}
    </div>;
};

export default Preloader;