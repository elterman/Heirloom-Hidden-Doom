import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import _ from 'lodash';
import Tile from './Tile';
import { a_paused, a_size, a_tiles } from './atoms';

const Board = () => {
    const [tiles] = useAtom(a_tiles);
    const [size] = useAtom(a_size);
    const [paused] = useAtom(a_paused);

    if (!size) {
        return null;
    }

    return <motion.div className='board' animate={{ opacity: paused ? 0.3 : 1 }}>
        {_.map(tiles, (tile, i) => <Tile key={size * 100 + i} tile={tile} />)}
    </motion.div>;
};

export default Board;