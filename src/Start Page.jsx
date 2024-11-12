import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { a_board_size, a_over, a_page, a_paused, a_size } from './atoms';
import { DEFAULT_GAME_SIZE, GAME_PAGE, START_PAGE } from './const';
import Help from './Help';
import Play from './Images/Play.webp';
import Title from './Images/Title.webp';
import Preloader from './Preloader';
import { useForceUpdate } from './useForceUpdate';
import useGameState from './useGameState';
import usePlaySound from './usePlaySound';
import { windowSize } from './utils';

const StartPage = () => {
    const [, setPage] = useAtom(a_page);
    const forceUpdate = useForceUpdate(true);
    const [, setBoardSize] = useAtom(a_board_size);
    const [size] = useAtom(a_size);
    const { onSizeSet } = useGameState();
    const [over] = useAtom(a_over);
    const [, setPaused] = useAtom(a_paused);

    const { y: wy, x: wx } = windowSize();

    useEffect(() => {
        window.addEventListener('resize', forceUpdate);
        return () => window.removeEventListener('resize', forceUpdate);
    }, [forceUpdate]);

    useEffect(() => {
        let sz;
        sz = Math.min(wy / 2, wx - 40);
        sz = Math.min(sz, 400);

        setBoardSize(sz);
    }, [setBoardSize, wx, wy]);

    const onPlay = () => {
        if (!size) {
            onSizeSet(DEFAULT_GAME_SIZE);
        }

        if (!over) {
            setPaused(true);
        }

        setPage(GAME_PAGE);
    };

    const style = { filter: 'saturate(1.5)' };

    return <motion.div className='start-page' animate={{ opacity: 1 }}>
        <img className='title' src={Title} alt='' />
        <Help />
        <AnimatedButton img={Play} width={80} onClick={onPlay} style={style} />
        <Preloader page={START_PAGE} />
    </motion.div>;
};

export default StartPage;

const AnimatedButton = (props) => {
    const { width, img, onClick, style } = props;
    const [scale, setScale] = useState(1);
    const playSound = usePlaySound();

    const onAnimationComplete = () => {
        if (scale < 1) {
            setScale(1);
            onClick && onClick();
        }
    };

    const onClicked = () => {
        playSound('tap');
        setScale(0.7);
    };

    const animate = { transform: `scale(${scale})` };
    const transition = { duration: 0.1 };

    return <motion.div animate={animate} transition={transition} onAnimationComplete={onAnimationComplete}
        style={{ placeSelf: 'center', cursor: 'pointer', ...style }}>
        <img src={img} alt='' width={width} onClick={onClicked} />
    </motion.div>;
};