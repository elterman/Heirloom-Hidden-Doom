import { motion } from 'framer-motion';
import Board from './Board';
import Prompts from './Prompts';
import Scoreboard from './Scoreboard';
import StartPrompt from './Start Prompt';
import StatsPanel from './Stats Panel';
import Toolbar from './Toolbar';

const GamePage = () => {
    return <motion.div className='game-page' animate={{ opacity: 1 }}>
        <div className='top-panel'>
            <StatsPanel />
            <Scoreboard />
        </div>
        <div id='mid-panel' className='mid-panel'>
            <Board />
            <StartPrompt />
        </div>
        <div className='bottom-panel'>
            <Prompts />
            <Toolbar />
        </div>
    </motion.div>;
};

export default GamePage;