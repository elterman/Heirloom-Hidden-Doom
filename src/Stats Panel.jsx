import { useAtom } from 'jotai';
import { a_gob, a_my_pix, a_solo, a_solo_stats } from './atoms';
import useLang, { S_AVE, S_BEST, S_PLAYS, S_SCORE } from './useLang';

const StatsPanel = () => {
    const [solo] = useAtom(a_solo);
    const [gob] = useAtom(a_gob);
    const [soloStats] = useAtom(a_solo_stats);
    const [myPix] = useAtom(a_my_pix);
    const { str } = useLang();

    if (solo) {
        const { plays, total_points, best_points } = soloStats;
        const ave = plays ? Math.round(total_points / plays) : 0;
        const best = plays ? best_points : 0;

        return <div className="stats-panel" >
            <div className='stats-panel-label'>{str(S_PLAYS)}</div>
            <div className='stats-panel-value'>{plays}</div>
            <div className='stats-panel-label'>{str(S_AVE)}</div>
            <div className='stats-panel-value'>{ave}</div>
            <div className='stats-panel-label'>{str(S_BEST)}</div>
            <div className='stats-panel-value'>{best}</div>
        </div>;
    }

    const { plays, wins } = gob.stats || { plays: 0, wins: [0, 0] };
    const won = wins[myPix ? myPix - 1 : 0];
    const lost = wins[myPix ? 2 - myPix : 1];

    return <div className="stats-panel" >
        <div className='stats-panel-label'>{str(S_PLAYS)}</div>
        <div className='stats-panel-value'>{plays}</div>
        <div className='stats-panel-label'>{str(S_SCORE)}</div>
        <div className='stats-panel-value'>{`${won} : ${lost}`}</div>
    </div>;
};

export default StatsPanel;