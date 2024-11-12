import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { appBackground } from './App Background.jsx';
import './App.css';
import { a_app_state, a_lang, a_page } from './atoms';
import { _11, APP_STATE, GAME_PAGE, START_PAGE } from './const.js';
import GamePage from './Game Page.jsx';
import BMG from './Images/BMG.webp';
import Preloader from './Preloader.jsx';
import StartPage from './Start Page.jsx';
import { EN, ES, PT, RU } from './useLang.js';
import { defer, windowSize } from './utils';

const App = () => {
    const [starting, setStarting] = useState(true);
    const [splash, setSplash] = useState(true);
    const [page] = useAtom(a_page);
    const [language, setLanguage] = useAtom(a_lang);
    const [, setAppState] = useAtom(a_app_state);
    const [splashBackground, setSplashBackground] = useState('#8A0000');

    useEffect(() => {
        if (language) {
            return;
        }

        const l = (navigator.language || navigator.languages[0]).split('-')[0];
        setLanguage(l === ES || l === PT || l === RU ? l : EN);
    }, [language, setLanguage]);

    const { x: wx, y: wy } = windowSize();

    if (starting) {
        const loadAppState = () => {
            let json = localStorage.getItem(APP_STATE);
            let appState = JSON.parse(json);

            if (appState) {
                return appState;
            }

            return { states: {} };
        };

        defer(() => {
            const appState = loadAppState();
            setAppState(appState);

            setStarting(false);
            defer(() => setSplash(false), 300);
        }, 2000);
    }

    const onClick = () => {
        localStorage.clear();
        setSplashBackground('#500000');
    };

    const gridArea = _11;

    const renderContent = () => {
        const bmgWidth = Math.min(300, Math.min(wx, wy) * 0.6);
        const splashBgImg = `radial-gradient(transparent, black ${100}%)`;

        if (splash) {
            return <motion.div className="splash" style={{ height: wy, width: wx }} onClick={onClick}
                animate={{ background: splashBackground, backgroundImage: splashBgImg, opacity: starting ? 1 : 0 }}>
                <img src={BMG} alt="BMG" width={bmgWidth} />
            </motion.div>;
        }

        if (starting) {
            return null;
        }

        const height = `min(100%, ${page === START_PAGE ? 800 : 750}px)`;

        return <div className='app-content' style={{ height }}>
            {page === START_PAGE ? <StartPage /> : null}
            {page === GAME_PAGE ? <GamePage /> : null}
        </div>;
    };

    const { image: backgroundImage, size: backgroundSize, opacity, gradient } = appBackground();

    return <div id='app' className="App">
        <div className='app-bg' style={{ display: 'grid', gridArea, backgroundImage, backgroundSize, opacity }} />
        <div id='app-bg-gradient' style={{ display: 'grid', gridArea, backgroundImage: gradient }} />
        {renderContent()}
        {starting && <Preloader />}
    </div>;
};

export default App;
