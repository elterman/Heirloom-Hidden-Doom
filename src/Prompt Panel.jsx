import { motion } from 'framer-motion';
import _ from 'lodash';
import SvgPromptX from './Svg Prompt X';
import { X } from './const';
import { clientRect, isOnMobile } from './utils';
import useLang, { S_BEST_SCORE } from './useLang';
import { useAtom } from 'jotai';
import { a_size } from './atoms';
import { useEffect, useState } from 'react';

const PromptPanel = (props) => {
    const { id, labels, onClick, show, style, buttonStyle, pulse, delay = 0 } = props;
    const [size] = useAtom(a_size);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let off = 0;

        if (show && id === 'pp-alert' && labels[0] === S_BEST_SCORE) {
            const r1 = clientRect('mid-panel');
            const r2 = clientRect(id);
            off = r1.y - r2.y + (r1.height - r2.height) / 2;
        }

        if (off !== offset) {
            setOffset(off);
        }
    }, [id, labels, offset, show]);

    const Button = (props) => {
        const { label, index } = props;
        const { className } = useLang();

        const width = label === X || label === 'GO' ? '48px' : 'unset';
        const transition = { repeat: Infinity, repeatType: 'reverse', ease: 'linear', duration: 0.25 };
        const baseClasses = `prompt-button${isOnMobile() ? '-mobile' : ''} ${className}`;
        let classes = `${baseClasses} gold-gradient`;
        const cursor = show ? 'pointer' : 'initial';
        const pointerEvents = show && onClick ? 'initial' : 'none';

        if (id === 'pp-sizes' && size !== index + 1) {
            classes = baseClasses;
        }

        return <motion.div className={classes} onClick={() => onClick(index + 1)}
            style={{ cursor, pointerEvents, width, ...buttonStyle }} initial={{ transform: 'scale(1)' }}
            animate={{ transform: `scale(${pulse ? 0.8 : 1})` }} transition={pulse ? transition : false}>
            <div>{label === X ? <SvgPromptX width={56} /> : label}</div>
        </motion.div>;
    };

    return <motion.div id={id} className='prompt-panel' animate={{ opacity: show ? 1 : 0, transform: `translateY(${offset}px) scale(${show ? 1 : 0})` }}
        transition={{ type: 'spring', damping: 15, delay }} style={{ ...style }}>
        {_.map(labels, (label, i) => <Button key={i} label={label} index={i} />)}
    </motion.div>;
};

export default PromptPanel;