import { useAtom } from 'jotai';
import Player from './Player';
import SwitchTip from './Switch Tip';
import { a_board_size, a_gob_players, a_gob_points, a_my_pix, a_opp_alert, a_over, a_paused, a_secs, a_solo, a_spectator } from './atoms';
import { MAX_SECS } from './const';
import { useInterval } from './useInterval';
import { formatTime } from './utils';
import useGameState from './useGameState';

const Scoreboard = () => {
    const [myPix] = useAtom(a_my_pix);
    const [spectator] = useAtom(a_spectator);
    const [solo] = useAtom(a_solo);
    const [secs] = useAtom(a_secs);
    const [oppAlert] = useAtom(a_opp_alert);
    const [paused] = useAtom(a_paused);
    const [over] = useAtom(a_over);
    const [players] = useAtom(a_gob_players);
    const [gobPoints] = useAtom(a_gob_points);
    const [boardSize] = useAtom(a_board_size);
    const { onTick } = useGameState();

    const interval = !spectator && !paused && !over && !oppAlert && secs < MAX_SECS ? 1000 : null;
    useInterval(() => onTick(secs + 1), interval);

    const s1 = players[spectator || myPix === 1 ? 0 : 1].secs || 0;

    if (solo) {
        return <div className="scoreboard-solo">
            <div className='time-solo'>{formatTime(s1)}</div>
            <Player player={1} />
            <div className='solo-points'>{gobPoints}</div>
        </div>;
    }

    const s2 = players[spectator || myPix === 1 ? 1 : 0].secs || 0;

    return <div className="scoreboard" style={{ width: boardSize }}>
        <Player player={1} style={{ gridArea: '1/1' }} />
        <div className='time' style={{ gridArea: '2/1' }}>{formatTime(s1)}</div>
        {!oppAlert && <Player player={2} style={{ gridArea: '1/2' }} />}
        {!oppAlert && <div className='time' style={{ gridArea: '2/2' }}>{formatTime(s2)}</div>}
        {!oppAlert && spectator && <SwitchTip />}
    </div>;
};

export default Scoreboard;