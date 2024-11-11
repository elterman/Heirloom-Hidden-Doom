import { useAtom } from 'jotai';
import { a_gob, a_opp_alert, a_over, a_page, a_paused, a_reset_stats, a_secs, a_solo, a_solo_stats, a_spectator } from './atoms';
import { GAME_PAGE, START_PAGE } from './const';
import Back from './Images/Back.webp';
import ResetStats from './Images/Reset Stats.webp';
import ToolButton from './Tool Button';
import usePlaySound from './usePlaySound';

const Toolbar = () => {
    const [page, setPage] = useAtom(a_page);
    const [over] = useAtom(a_over);
    const [oppAlert] = useAtom(a_opp_alert);
    const [solo] = useAtom(a_solo);
    const [secs] = useAtom(a_secs);
    const [gob] = useAtom(a_gob);
    const [soloStats] = useAtom(a_solo_stats);
    const [spectator] = useAtom(a_spectator);
    const [, setPaused] = useAtom(a_paused);
    const [, setResetStats] = useAtom(a_reset_stats);
    const playSound = usePlaySound();

    const onBack = () => {
        if (page === GAME_PAGE && !over) {
            setPaused(true);
        }

        setPage(START_PAGE);
    };

    const onResetStats = () => {
        if (secs && !over) {
            setPaused(true);
        }

        playSound('oops');
        setResetStats(true);
    };

    const plays = solo ? soloStats.plays : (gob.stats?.plays || 0);
    const onClick = plays > 0 ? onResetStats : null;

    return <div className="toolbar">
        <ToolButton img={Back} onClick={onBack} />
        {!spectator && !oppAlert && <div style={{ filter: onClick ? 'none' : 'grayscale(1) opacity(0.7)' }}>
            <ToolButton img={ResetStats} onClick={onClick} />
        </div>}
    </div>;
};

export default Toolbar;