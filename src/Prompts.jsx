import { useAtom } from 'jotai';
import _ from 'lodash';
import PromptPanel from './Prompt Panel';
import { a_alert, a_gob_players, a_my_pix, a_over, a_paused, a_gob_points, a_reset_stats, a_size, a_solo, a_solo_stats, a_spectator } from './atoms';
import { X } from './const';
import useGameState from './useGameState';
import useLang, { S_BEST_SCORE, S_PLAY_AGAIN, S_RESET_STATS, S_WAITING_FOR_START } from './useLang';
import usePersistedData from './usePersistedData';
import usePlaySound from './usePlaySound';
import { defer, runeAction } from './utils';

const Prompts = () => {
    const [size] = useAtom(a_size);
    const [resetStats, setResetStats] = useAtom(a_reset_stats);
    const [soloStats] = useAtom(a_solo_stats);
    const [points] = useAtom(a_gob_points);
    const [alert] = useAtom(a_alert);
    const [over, setOver] = useAtom(a_over);
    const [, setPaused] = useAtom(a_paused);
    const { updateSoloStats } = usePersistedData();
    const [myPix] = useAtom(a_my_pix);
    const playSound = usePlaySound();
    const { onSizeSet } = useGameState();
    const { str } = useLang();
    const [players] = useAtom(a_gob_players);
    const [solo] = useAtom(a_solo);
    const [spectator] = useAtom(a_spectator);

    const dismiss = (cancel) => {
        setResetStats(false);
    };

    const onResponse = (op) => {
        playSound('tap');

        if (op === 1) {
            if (resetStats) {
                setResetStats(false);

                if (solo) {
                    updateSoloStats(null);
                } else if (myPix) {
                    runeAction(RA_SET_STATS, { plays: 0, wins: [0, 0] });
                }
            } else if (over) {
                defer(() => {
                    setOver(null);
                    setPaused(true);
                    onSizeSet(size);
                });
            }
        } else {
            dismiss(true);
        }
    };

    const getOverPrompt = () => {
        const isOver = solo ? players[0].over : _.every(players, 'over');

        if (!isOver || alert || resetStats || spectator) {
            return null;
        }

        return str(S_PLAY_AGAIN);
    };

    const alertButtonStyle = { pointerEvents: 'none', filter: 'saturate(2)' };
    const overPrompt = getOverPrompt();
    const pointerEvents = myPix ? 'all' : 'none';
    const showBestScore = spectator && solo && over && soloStats.best_points > 10 && points >= soloStats.best_points && !alert;

    return <>
        <PromptPanel id='pp-over' labels={[overPrompt]} delay={overPrompt ? 0.5 : 0} onClick={onResponse} show={overPrompt}
            buttonStyle={{ pointerEvents }} />
        <PromptPanel id='pp-reset-stats' labels={[str(S_RESET_STATS), X]} onClick={onResponse} show={resetStats} />
        <PromptPanel id='pp-alert' labels={[str(alert)]} show={!!alert} buttonStyle={alertButtonStyle} />
        <PromptPanel id='pp-no-size' labels={[str(S_WAITING_FOR_START)]} show={!size} buttonStyle={{ pointerEvents: 'none', filter: 'sepia(1)' }} />
        <PromptPanel id='pp-best_score' labels={[str(S_BEST_SCORE)]} show={showBestScore} buttonStyle={alertButtonStyle} />
    </>;
};

export default Prompts;