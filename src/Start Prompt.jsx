import { useAtom } from 'jotai';
import { a_paused, a_reset_stats, a_secs, a_size } from './atoms';
import { _11, SIZES } from './const';
import PromptPanel from './Prompt Panel';
import useGameState from './useGameState';
import useLang, { S_RESUME, S_START } from './useLang';
import usePlaySound from './usePlaySound';

const StartPrompt = () => {
    const playSound = usePlaySound();
    const [size] = useAtom(a_size);
    const { str } = useLang();
    const [secs] = useAtom(a_secs);
    const [paused, setPaused] = useAtom(a_paused);
    const [resetStats] = useAtom(a_reset_stats);
    const { onSizeSet } = useGameState();

    const start = secs === 0;
    const show = paused && !resetStats;

    const onResize = (op) => {
        playSound('tap');

        if (op !== size) {
            onSizeSet(op);
        }
    };

    const onStartOrResume = () => {
        setPaused(false);

        if (secs === 0) {
            playSound('dice');
        }
    };

    const prompt = <PromptPanel id='pp-start' style={{ gridArea: start ? '2/1' : _11 }} labels={[str(start ? S_START : S_RESUME)]}
        onClick={onStartOrResume} show={show} buttonStyle={{ fontSize: '22px' }} />;

    if (start) {
        const style = { fontFamily: 'Cinzel', fontSize: '28px', fontWeight: 'bold', width: 50, height: 50, borderRadius: '50%' };

        return <div className="start-prompt">
            <PromptPanel id='pp-sizes' style={{ gridArea: _11, gap: '16px' }} labels={SIZES} onClick={onResize} show={show} buttonStyle={style} />
            {prompt}
        </div>;
    }

    return <div className="start-prompt">
        {prompt}
    </div>;
};

export default StartPrompt;