import { useAtom } from 'jotai';
import { a_alert, a_over, a_paused, a_points, a_secs, a_size, a_step, a_tick_time, a_tile_sets } from './atoms';
import { SECS } from './const';
import { retile } from './utils';

const useGameState = () => {
    const [size, setSize] = useAtom(a_size);
    const [, setTileSets] = useAtom(a_tile_sets);
    const [, setStep] = useAtom(a_step);
    const [, setSecs] = useAtom(a_secs);
    const [points, setPoints] = useAtom(a_points);
    const [, setOver] = useAtom(a_over);
    const [, setPaused] = useAtom(a_paused);
    const [, setAlert] = useAtom(a_alert);
    const [, setTickTime] = useAtom(a_tick_time);

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
    };

    const onTick = (secs) => {
        setSecs(secs);

        let pnts = points;

        if (pnts > 0) {
            const allowedSecs = SECS[size - 1];
            pnts = Math.round(1000 * (1 - secs / allowedSecs));
            pnts = Math.max(pnts, 10);

            setPoints(pnts);
            setTickTime(Date.now());
        }

        return pnts;
    };

    return { onSizeSet, onTick };
};

export default useGameState;