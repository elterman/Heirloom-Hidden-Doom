import { motion } from 'framer-motion';
import { useState } from 'react';
import usePlaySound from './usePlaySound';
import { _11 } from './const';

const ToolButton = (props) => {
    const { width = 50, img, label, disabled = false, style, onClick, href } = props;
    const [scale, setScale] = useState(1);
    const playSound = usePlaySound();

    const pointerEvents = disabled || (!onClick && !href) ? 'none' : 'auto';

    const onAnimationComplete = () => {
        if (scale < 1) {
            setScale(1);
            onClick && onClick();
        }
    };

    const onClicked = () => {
        if (!onClick) {
            return;
        }

        playSound('tap');
        setScale(0.7);
    };

    const renderIcon = () => {
        const style = { gridArea: _11, zIndex: 1, display: 'grid', filter: disabled ? 'grayscale(1) opacity(0.7)' : 1 };

        if (href) {
            return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
                <img src={img} alt='' width={width} />
            </a>;
        }

        return <img src={img} alt='' width={width} style={style} />;
    };

    const animate = { transform: `scale(${scale})` };
    const transition = { duration: 0.1 };

    return <motion.div className="tool-button" style={{ ...style, pointerEvents }} onClick={onClicked}>
        <motion.div style={{ display: 'grid', placeItems: 'center' }} animate={animate} transition={transition}
            onAnimationComplete={onAnimationComplete}>
            {renderIcon()}
        </motion.div>
        {label && <motion.div style={{ gridArea: '1/2', justifySelf: 'start', opacity: disabled ? 0.75 : 1 }}
            animate={animate} transition={transition}>{label}</motion.div>}
    </motion.div>;
};

export default ToolButton;;