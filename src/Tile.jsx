import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { a_alert, a_board_size, a_dimension, a_over, a_paused, a_points, a_secs, a_selected, a_stats, a_step, a_tap, a_tick_time } from './atoms';
import { _11, COIN, LOST, TILE_SET_SIZE, TRAP, WON } from './const';
import Coin from './Images/Coin.webp';
import Trap from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import Frame from './Images/Tile Frame.webp';
import useGameState from './useGameState';
import { S_BEST_SCORE } from './useLang';
import usePlaySound from './usePlaySound';
import { defer, isAppleDevice, samePos } from './utils';

const Tile = (props) => {
    const [bsz] = useAtom(a_board_size);
    const [dim] = useAtom(a_dimension);
    let [over, setOver] = useAtom(a_over);
    const [step, setStep] = useAtom(a_step);
    const [, setAlert] = useAtom(a_alert);
    const playSound = usePlaySound();
    const [paused] = useAtom(a_paused);
    const [stats, setStats] = useAtom(a_stats);
    const { onTick } = useGameState();
    const [secs] = useAtom(a_secs);
    const [tap, setTap] = useAtom(a_tap);
    const [tickTime] = useAtom(a_tick_time);
    const [points, setPoints] = useAtom(a_points);
    const [soloPoints, setSoloPoints] = useState(points);
    const [selected, setSelected] = useAtom(a_selected);

    const { tile } = props;
    const { row, col, item } = tile;
    const gridArea = `${row}/${col}`;
    const flag = !over && (item === COIN || item === TRAP);
    const coin = over && item === COIN;
    const trap = over && item === TRAP;
    const width = bsz / dim;
    const flagSize = width / 1.4;
    const coinSize = width / 1.4;
    const trapSize = width / 1.8;
    const apple = isAppleDevice();

    const processClick = () => {
        setTap(null);
        setSelected({ row, col });

        if (!item) {
            const nextStep = step === TILE_SET_SIZE ? 1 : step + 1;
            setStep(nextStep);

            return;
        }

        over = item === TRAP ? LOST : WON;
        setOver(over);
        playSound(over);

        if (over === LOST) {
            defer(() => {
                setPoints(0);
            }, 100);
        }

        const { plays, total_points, best_points } = stats;
        const pnts = over === LOST ? 0 : soloPoints;

        setStats({ plays: plays + 1, total_points: total_points + pnts, best_points: Math.max(best_points, pnts) });

        if (best_points > 10 && pnts > best_points) {
            setAlert({ alert: S_BEST_SCORE });
        }
    };

    const onAnimationComplete = () => {
        if (tap) {
            processClick();
        }
    };

    const onClicked = () => {
        playSound('tap');
        setTap({ row, col });

        if (item === COIN) {
            const delta = ((Date.now() - tickTime) / 1000) % 1;

            const s = secs + delta;
            const pnts = onTick(s);
            setSoloPoints(pnts);
        }

        if (apple) {
            defer(() => {
                setTap(null);
                processClick();
            }, 100);
        }
    };

    const renderInner = () => {
        const renderContent = (props) => {
            if (paused) {
                return null;
            }

            const { img, sz } = props;

            return <div className='tile-content'>
                <img src={img} alt='' width={sz} />
            </div>;
        };

        return <div className={`tile-inner${sel ? '-selected' : ''}`}>
            <img src={Frame} alt='' width='100%' height='100%' style={{ gridArea: _11 }} />
            {coin && renderContent({ img: Coin, sz: coinSize })}
            {trap && renderContent({ img: Trap, sz: trapSize })}
            {flag && renderContent({ img: Flag, sz: flagSize })}
        </div>;
    };

    const id = (row, col) => `tile-${row * 10 + col}`;
    const tapped = samePos(tap, tile);
    const scale = tapped ? 0.7 : 1;
    const animate = { transform: `scale(${scale})` };
    const transition = { duration: 0.1 };
    const pointerEvents = !paused && !over ? 'auto' : 'none';
    const sel = over && selected && samePos(selected, tile);

    if (apple) {
        const style = { transform: `scale(${tapped ? 0.95 : 1})`, filter: tapped ? 'sepia(1) saturate(3)' : 'none' };

        return <div id={id(row, col)} className='tile' style={{ gridArea, width, height: width, pointerEvents, ...style }} onClick={onClicked}>
            {renderInner()}
        </div>;
    }

    return <motion.div id={id(row, col)} className='tile' style={{ gridArea, width, height: width, pointerEvents }} onClick={onClicked}
        initial={{ transform: 'scale(1)' }} animate={animate} transition={transition} onAnimationComplete={onAnimationComplete}>
        {renderInner()}
    </motion.div>;
};

export default Tile;