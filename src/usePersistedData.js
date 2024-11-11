import { useAtom } from 'jotai';
import _ from 'lodash';
import { a_my_pid, a_pids, a_gob, a_size } from './atoms';
import { RA_PERSIST } from './logic';
import { runeAction } from './utils';

const usePersistedData = () => {
    const [gob] = useAtom(a_gob);
    const [pids] = useAtom(a_pids);
    const [pid] = useAtom(a_my_pid);
    const [size] = useAtom(a_size);

    const data = _.get(gob.persisted, pid || pids[0], null);

    const getSoloStats = () => {
        let stats = _.get(data, 'stats', null);
        stats = _.get(stats, size, null);

        return stats || { plays: 0, total_points: 0, best_points: 0 };
    };

    const updateSoloStats = (stats) => {
        runeAction(RA_PERSIST, { ...data, stats: { ...data.stats, [size]: stats } });
    };

    return { persistedData: data, getSoloStats, updateSoloStats };
};

export default usePersistedData;