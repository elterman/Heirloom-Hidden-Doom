import { useAtom } from 'jotai';
import { a_stats } from './atoms';
import useLang, { S_AVE, S_BEST, S_PLAYS } from './useLang';

const StatsPanel = () => {
    const [stats] = useAtom(a_stats);
    const { str } = useLang();

    const { plays, total_points, best_points } = stats;
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
};

export default StatsPanel;