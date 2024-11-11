import { useAtom } from 'jotai';
import { a_alert, a_gob, a_my_pix, a_over, a_page, a_paused, a_points, a_secs, a_size, a_solo, a_spectator, a_step, a_tick_time, a_tile_sets } from './atoms';
import { DRAW, LOST, P1_WON, P2_WON, SECS, START_PAGE, WON } from './const';
import { RA_PLAYER_TICK, RA_SET_POINTS, RA_SET_STATS, RA_SIZE_SET } from './logic';
import { S_BOTH_DEAD, S_ITS_DRAW, S_P1_WON, S_P2_WON, S_YOU_LOST, S_YOU_WON } from './useLang';
import usePlaySound from './usePlaySound';
import { defer, getWinner, retile, runeAction } from './utils';

const useGameState = () => {
    const [spectator] = useAtom(a_spectator);
    const [solo] = useAtom(a_solo);
    const [size, setSize] = useAtom(a_size);
    const [, setTileSets] = useAtom(a_tile_sets);
    const [, setStep] = useAtom(a_step);
    const [, setSecs] = useAtom(a_secs);
    const [points, setPoints] = useAtom(a_points);
    const [, setOver] = useAtom(a_over);
    const [, setPaused] = useAtom(a_paused);
    const [, setAlert] = useAtom(a_alert);
    const [gob] = useAtom(a_gob);
    const [myPix] = useAtom(a_my_pix);
    const [, setTickTime] = useAtom(a_tick_time);
    const [, setPage] = useAtom(a_page);
    const playSound = usePlaySound();

    const goBackToStart = (gob) => {
        setPage(START_PAGE);
        setAlert({ alert: null });
        setSize(null);
    };

    const onSizeSet = (size, tileSets) => {
        setSize(size);

        const doRetile = !tileSets;

        if (doRetile) {
            tileSets = retile(size);
        }

        setTileSets(tileSets);
        setStep(1);
        setSecs(0);
        setPoints(1000);
        setOver(null);
        setPaused(true);
        setAlert({ alert: null });

        if (!spectator && doRetile) {
            runeAction(RA_SIZE_SET, { size, tileSets });
        }
    };

    const onTick = (secs) => {
        setSecs(secs);

        if (!spectator) {
            runeAction(RA_PLAYER_TICK, { player: myPix, secs });
        }

        if (!solo) {
            return 0;
        }

        let pnts = points;

        if (pnts > 0) {
            const allowedSecs = SECS[size - 1];
            pnts = Math.round(1000 * (1 - secs / allowedSecs));
            pnts = Math.max(pnts, 10);

            setPoints(pnts);

            if (!spectator) {
                runeAction(RA_SET_POINTS, pnts);
                setTickTime(Date.now());
            }
        }

        return pnts;
    };

    const onOver = (players) => {
        if (solo) {
            return;
        }

        const winner = getWinner(players);

        if (winner === null) {
            return;
        }

        let { plays, wins } = gob.stats || { plays: 0, wins: [0, 0] };

        plays += 1;

        if (winner === myPix) {
            wins[myPix - 1] += 1;
        } else if (winner > 0) {
            wins[2 - myPix] += 1;
        }

        if (myPix) {
            runeAction(RA_SET_STATS, { plays, wins });
        }

        let chime = DRAW;
        let prompt;

        if (spectator) {
            prompt = winner === 1 ? S_P1_WON : winner === 2 ? S_P2_WON : winner < 0 ? S_BOTH_DEAD : S_ITS_DRAW;

            if (winner === 1) {
                chime = P1_WON;
            } else if (winner === 2) {
                chime = P2_WON;
            }
        } else {
            prompt = winner === myPix ? S_YOU_WON : winner < 0 ? S_BOTH_DEAD : winner ? S_YOU_LOST : S_ITS_DRAW;

            if (winner === myPix) {
                chime = WON;
            } else if (winner > 0) {
                chime = LOST;
            }
        }

        defer(() => playSound(chime), 500);
        setAlert({ alert: prompt, duration: spectator ? 0 : 2000 });
    };

    return { onSizeSet, onTick, onOver, goBackToStart };
};

export default useGameState;