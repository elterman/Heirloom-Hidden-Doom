import { useAtom } from 'jotai';
import PromptPanel from './Prompt Panel';
import { a_alert, a_over, a_paused, a_reset_stats, a_size, a_stats } from './atoms';
import { X } from './const';
import useGameState from './useGameState';
import useLang, { S_PLAY_AGAIN, S_RESET_STATS, S_WAITING_FOR_START } from './useLang';
import usePlaySound from './usePlaySound';
import { defer } from './utils';

const Prompts = () => {
    const [size] = useAtom(a_size);
    const [resetStats, setResetStats] = useAtom(a_reset_stats);
    const [alert] = useAtom(a_alert);
    const [over, setOver] = useAtom(a_over);
    const [, setPaused] = useAtom(a_paused);
    const playSound = usePlaySound();
    const { onSizeSet } = useGameState();
    const { str } = useLang();
    const [, setStats] = useAtom(a_stats);

    const dismiss = (cancel) => {
        setResetStats(false);
    };

    const onResponse = (op) => {
        playSound('tap');

        if (op === 1) {
            if (resetStats) {
                setResetStats(false);
                setStats(null);
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
        const isOver = over;

        if (!isOver || alert || resetStats) {
            return null;
        }

        return str(S_PLAY_AGAIN);
    };

    const alertButtonStyle = { pointerEvents: 'none', filter: 'saturate(2)' };
    const overPrompt = getOverPrompt();

    return <>
        <PromptPanel id='pp-over' labels={[overPrompt]} delay={overPrompt ? 0.5 : 0} onClick={onResponse} show={overPrompt}/>
        <PromptPanel id='pp-reset-stats' labels={[str(S_RESET_STATS), X]} onClick={onResponse} show={resetStats} />
        <PromptPanel id='pp-alert' labels={[str(alert)]} show={!!alert} buttonStyle={alertButtonStyle} />
        <PromptPanel id='pp-no-size' labels={[str(S_WAITING_FOR_START)]} show={!size} buttonStyle={{ pointerEvents: 'none', filter: 'sepia(1)' }} />
    </>;
};

export default Prompts;