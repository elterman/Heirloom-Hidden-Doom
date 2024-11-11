import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { a_alert, a_board_size, a_dimension, a_gob_players, a_my_pix, a_opp_alert, a_over, a_paused, a_points, a_secs, a_solo, a_solo_stats, a_spectator, a_step, a_tap, a_tick_time, a_watched_pix } from './atoms';
import { _11, COIN, LOST, TILE_SET_SIZE, TRAP, WON } from './const';
import Coin from './Images/Coin.webp';
import Trap from './Images/Death.webp';
import Flag from './Images/Flag.webp';
import FrameGreen from './Images/Tile Frame Green.webp';
import FramePink from './Images/Tile Frame Pink.webp';
import Frame from './Images/Tile Frame.webp';
import useGameState from './useGameState';
import { S_BEST_SCORE } from './useLang';
import usePersistedData from './usePersistedData';
import usePlaySound from './usePlaySound';
import { defer, isAppleDevice, runeAction, samePos } from './utils';
import { useState } from 'react';

const Tile = (props) => {
    const [bsz] = useAtom(a_board_size);
    const [dim] = useAtom(a_dimension);
    let [over, setOver] = useAtom(a_over);
    const [step, setStep] = useAtom(a_step);
    const [, setAlert] = useAtom(a_alert);
    const playSound = usePlaySound();
    const [paused] = useAtom(a_paused);
    const [oppAlert] = useAtom(a_opp_alert);
    const [solo] = useAtom(a_solo);
    const [stats] = useAtom(a_solo_stats);
    const [myPix] = useAtom(a_my_pix);
    const [watchedPix] = useAtom(a_watched_pix);
    const [players] = useAtom(a_gob_players);
    const { updateSoloStats } = usePersistedData();
    const { onOver, onTick } = useGameState();
    const [secs] = useAtom(a_secs);
    const [spectator] = useAtom(a_spectator);
    const [tap, setTap] = useAtom(a_tap);
    const [tickTime] = useAtom(a_tick_time);
    const [points, setPoints] = useAtom(a_points);
    const [soloPoints, setSoloPoints] = useState(points);

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

        if (!item) {
            const nextStep = step === TILE_SET_SIZE ? 1 : step + 1;
            setStep(nextStep);

            if (myPix) {
                runeAction(RA_PLAYER_TAP, { player: myPix, row, col, step: nextStep });
            }

            return;
        }

        over = item === TRAP ? LOST : WON;
        setOver(over);
        playSound(over, { rate: solo ? 1 : 2 });

        if (!spectator) {
            defer(() => runeAction(RA_PLAYER_OVER, { player: myPix, over, secs }), 100);
        }

        if (solo) {
            if (over === LOST) {
                defer(() => {
                    setPoints(0);

                    if (!spectator) {
                        runeAction(RA_SET_POINTS, 0);
                    }
                }, 100);
            }

            if (!spectator) {
                const { plays, total_points, best_points } = stats;
                const pnts = over === LOST ? 0 : soloPoints;

                updateSoloStats({ plays: plays + 1, total_points: total_points + pnts, best_points: Math.max(best_points, pnts) });

                if (best_points > 10 && pnts > best_points) {
                    setAlert({ alert: S_BEST_SCORE });
                }
            }
        } else {
            if (myPix) {
                players[myPix - 1].over = over;
            }

            onOver(players);
        }

        if (myPix) {
            runeAction(RA_PLAYER_TAP, { player: myPix, row, col, step, over });
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

        if (solo && item === COIN) {
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
            <img src={frame} alt='' width='100%' height='100%' style={{ gridArea: _11 }} />
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
    const pointerEvents = !spectator && !paused && !oppAlert && !over ? 'auto' : 'none';
    const frame = spectator && !solo ? (watchedPix === 1 ? FrameGreen : FramePink) : Frame;
    const p = players[(myPix || watchedPix) - 1];
    const sel = p.over && p.selected && samePos(p.selected, tile);

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