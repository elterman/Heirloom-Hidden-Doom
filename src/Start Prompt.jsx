import { useAtom } from 'jotai';
import { a_gob_players, a_my_pix, a_opp_alert, a_paused, a_reset_stats, a_secs, a_size, a_spectator } from './atoms';
import { _11, SIZES } from './const';
import { RA_PLAYER_TICK } from './logic';
import PromptPanel from './Prompt Panel';
import useGameState from './useGameState';
import useLang, { S_RESUME, S_START } from './useLang';
import usePlaySound from './usePlaySound';
import { runeAction } from './utils';

const StartPrompt = () => {
    const playSound = usePlaySound();
    const [size] = useAtom(a_size);
    const [oppAlert] = useAtom(a_opp_alert);
    const { str } = useLang();
    const [secs] = useAtom(a_secs);
    const [paused, setPaused] = useAtom(a_paused);
    const [resetStats] = useAtom(a_reset_stats);
    const [spectator] = useAtom(a_spectator);
    const [myPix] = useAtom(a_my_pix);
    const [players] = useAtom(a_gob_players);
    const { onSizeSet } = useGameState();

    if (spectator) {
        return null;
    }

    const start = secs === 0;
    const show = !spectator && paused && !oppAlert && !resetStats;

    const onResize = (op) => {
        playSound('tap');

        if (op !== size) {
            onSizeSet(op);
        }
    };

    const onStartOrResume = () => {
        setPaused(false);

        if (secs === 0) {
            runeAction(RA_PLAYER_TICK, { player: myPix, secs: -1 });
            playSound('dice');
        }
    };

    const prompt = <PromptPanel id='pp-start' style={{ gridArea: start ? '2/1' : _11 }} labels={[str(start ? S_START : S_RESUME)]}
        onClick={onStartOrResume} show={show} buttonStyle={{ fontSize: '22px' }} />;

    if (start) {
        const oppSecs = players[2 - myPix].secs;

        const style = {
            fontFamily: 'Cinzel', fontSize: '28px', fontWeight: 'bold', width: 50, height: 50, borderRadius: '50%',
            pointerEvents: oppSecs ? 'none' : 'auto', filter: oppSecs ? 'sepia(1)' : 'none'
        };

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