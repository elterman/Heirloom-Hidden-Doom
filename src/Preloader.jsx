import Back from './Images/Back.webp';
import Coin from './Images/Coin.webp';
import Death from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import Gold from './Images/Gold.webp';
import Pattern from './Images/Pattern.webp';
import Play from './Images/Play.webp';
import ResetStats from './Images/Reset Stats.webp';
import SoundOff from './Images/Sound Off.webp';
import SoundOn from './Images/Sound On.webp';
import TileFrame from './Images/Tile Frame.webp';
import Title from './Images/Title.webp';
import { START_PAGE } from './const';

const Preloader = (props) => {
    const { page: p = null } = props;

    return <div className='dummy' >
        {p === null && <img className='dummy' src={Pattern} alt='' />}
        {p === null && <img className='dummy' src={Play} alt='' />}
        {p === null && <img className='dummy' src={Title} alt='' />}

        {p === START_PAGE && <img className='dummy' src={Back} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Coin} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Death} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Flag} alt='' />}
        {p === START_PAGE && <img className='dummy' src={Gold} alt='' />}
        {p === START_PAGE && <img className='dummy' src={ResetStats} alt='' />}
        {p === START_PAGE && <img className='dummy' src={SoundOff} alt='' />}
        {p === START_PAGE && <img className='dummy' src={SoundOn} alt='' />}
        {p === START_PAGE && <img className='dummy' src={TileFrame} alt='' />}
    </div>;
};

export default Preloader;