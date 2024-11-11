import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { a_alert, a_board_size, a_solo, a_spectator, a_switch_tip } from './atoms';
import Hand from './Images/Hand.webp';

const SwitchTip = () => {
    const [solo] = useAtom(a_solo);
    const [spectator] = useAtom(a_spectator);
    const [alert] = useAtom(a_alert);
    const [switchTip, setSwitchTip] = useAtom(a_switch_tip);
    const [scale, setScale] = useState(1);
    const [opacity, setOpacity] = useState(1);
    const [boardSize] = useAtom(a_board_size);
    const [span, setSpan] = useState(boardSize  / 4);

    if (solo || !spectator || !switchTip || alert) {
        return null;
    }

    const onTranslateComplete = () => {
        if (span) {
            setScale(0.8);
        } else if (switchTip) {
            setOpacity(0);
        }
    };

    const onScaleComplete = () => {
        if (scale < 1) {
            setScale(1);
            setSpan(0);
        }
    };

    const onOpacityComplete = () => {
        if (!opacity) {
            setSwitchTip(false);
        }
    };

    const translateTransform = `translateX(${span}px)`;
    const scaleTransform = `scale(${scale})`;

    return <motion.div className='switch-tip'
        animate={{ transform: translateTransform }} transition={{ delay: span ? 1 : 0.3, duration: 1 }} onAnimationComplete={onTranslateComplete}>
        <motion.div animate={{ opacity }} transition={{ duration: 0.5 }} onAnimationComplete={onOpacityComplete}>
            <motion.img src={Hand} alt='switch tip' width={35} animate={{ transform: scaleTransform }}
                onAnimationComplete={onScaleComplete} />
        </motion.div>
    </motion.div>;
};

export default SwitchTip;