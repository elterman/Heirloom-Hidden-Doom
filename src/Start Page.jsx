import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { a_board_size, a_gob, a_online, a_over, a_page, a_paused, a_size, a_spectator, a_step, a_watched_pix } from './atoms';
import { DEFAULT_GAME_SIZE, GAME_PAGE, START_PAGE } from './const';
import Help from './Help';
import Play from './Images/Play.webp';
import Title from './Images/Title.webp';
import Watch from './Images/Watch.webp';
import PromptPanel from './Prompt Panel';
import { useForceUpdate } from './useForceUpdate';
import useGameState from './useGameState';
import useLang, { S_OFFLINE } from './useLang';
import usePlaySound from './usePlaySound';
import { windowSize } from './utils';
import Preloader from './Preloader';

const StartPage = () => {
    const [, setPage] = useAtom(a_page);
    const forceUpdate = useForceUpdate(true);
    const [, setBoardSize] = useAtom(a_board_size);
    const [size] = useAtom(a_size);
    const { onSizeSet } = useGameState();
    const [spectator] = useAtom(a_spectator);
    const [gob] = useAtom(a_gob);
    const [watchedPix] = useAtom(a_watched_pix);
    const [, setStep] = useAtom(a_step);
    const [, setOver] = useAtom(a_over);
    const [online] = useAtom(a_online);
    const { str } = useLang();
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
            if (spectator) {
                onSizeSet(gob.size, gob.tileSets);
            } else {
                onSizeSet(DEFAULT_GAME_SIZE);
            }
        }

        if (spectator) {
            const { step = 1, over } = gob.players[watchedPix - 1];
            setStep(step);
            setOver(over);
        } else {
            setPaused(true);
        }

        setPage(GAME_PAGE);
    };

    const style = { filter: spectator ? 'none' : 'saturate(1.5)' };
    const promptButtonStyle = { pointerEvents: 'none', filter: 'saturate(2)' };

    return <motion.div className='start-page' animate={{ opacity: 1 }}>
        <img src={Title} alt='' width='85%' style={{ placeSelf: 'center' }} />
        <Help />
        {online && <AnimatedButton img={spectator ? Watch : Play} width={80} onClick={onPlay} style={style} />}
        {!online && <PromptPanel id='pp-offline' labels={[str(S_OFFLINE)]} show={!online} style={{ gridArea: 'unset' }}
            buttonStyle={promptButtonStyle} />}
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