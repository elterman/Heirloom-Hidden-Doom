import { useAtom } from 'jotai';
import Player from './Player';
import { a_over, a_paused, a_points, a_secs } from './atoms';
import { MAX_SECS } from './const';
import useGameState from './useGameState';
import { useInterval } from './useInterval';
import { formatTime } from './utils';

const Scoreboard = () => {
    const [secs] = useAtom(a_secs);
    const [paused] = useAtom(a_paused);
    const [over] = useAtom(a_over);
    const [points] = useAtom(a_points);
    const { onTick } = useGameState();

    const interval = !paused && !over && secs < MAX_SECS ? 1000 : null;
    useInterval(() => onTick(secs + 1), interval);

        return <div className="scoreboard-solo">
            <div className='time-solo'>{formatTime(secs)}</div>
            <Player player={1} />
            <div className='solo-points'>{points}</div>
        </div>;
};

export default Scoreboard;