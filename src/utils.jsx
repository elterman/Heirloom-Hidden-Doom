import _ from 'lodash';
import { COIN, FLAGS, LOST, MIN_GAME_DIMENSION, SECS, TILE_SET_SIZE, TRAP } from './const';

export const windowSize = () => {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    return { x, y };
};

export const isOnMobile = () => typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

export const scrollClass = () => `root-scroll ${isOnMobile() ? 'root-scroll-mobile' : ''}`;

const inView = ob => {
    if (!ob) {
        return;
    }

    const e = document.getElementById(ob.id);

    if (!e) {
        return;
    }

    const r1 = { x1: e.offsetLeft, y1: e.offsetTop };
    r1.x2 = r1.x1 + e.offsetWidth;
    r1.y2 = r1.y1 + e.offsetHeight;

    const s = document.getElementById('surface');
    const r2 = { x1: s.offsetLeft + s.scrollLeft, y1: s.offsetTop + s.scrollTop };
    r2.x2 = r2.x1 + s.offsetWidth;
    r2.y2 = r2.y1 + s.offsetHeight;

    return r1.x1 >= r2.x1 && r1.x2 <= r2.x2 && r1.y1 >= r2.y1 && r1.y2 <= r2.y2;
};

export const scrollTo = ob => {
    if (!ob) {
        return;
    }

    if (inView(ob)) {
        return false;
    }

    const e = document.getElementById(ob.id);

    if (!e) {
        return false;
    }

    e.scrollIntoView({ behavior: 'smooth' });

    return true;
};

export const clientRect = obid => {
    const ob = document.getElementById(obid);
    const r = ob?.getBoundingClientRect();

    return r;
};

export const defer = (fn, ms = 1) => _.delay(fn, ms);

const shuffle = (size, coinIndex = null) => {
    const dim = size + MIN_GAME_DIMENSION - 1;
    const tileCount = dim * dim;
    let range = _.range(0, tileCount);
    let flagCount = FLAGS[size - 1];
    let indexes;

    if (_.isNumber(coinIndex)) {
        range = _.reject(range, i => i === coinIndex);
        flagCount -= 1;
        indexes = _.sampleSize(range, flagCount);
    } else {
        indexes = _.sampleSize(range, flagCount);
        coinIndex = _.sample(indexes);
    }

    const tiles = [];
    range = _.range(1, dim + 1);

    _.each(range, row => {
        _.each(range, col => {
            const tile = { row, col };
            const i = (row - 1) * dim + (col - 1);

            if (i === coinIndex) {
                tile.item = COIN;
            } else if (_.includes(indexes, i)) {
                tile.item = TRAP;
            }

            tiles.push(tile);
        });
    });

    return { tiles, coinIndex };
};

export const retile = size => {
    const sets = [];

    let { tiles, coinIndex } = shuffle(size);
    sets.push(tiles);

    for (let i = 0; i < TILE_SET_SIZE - 1; i++) {
        tiles = shuffle(size, coinIndex).tiles;
        sets.push(tiles);
    }

    return sets;
};

export const formatTime = (secs) => {
    secs = Math.max(secs, 0);
    secs = Math.round(secs);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const remSecs = secs % 60;

    const formatted = (h > 0 ? `${h}:${m.toString().padStart(2, '0')}` : m) + `:${remSecs.toString().padStart(2, '0')}`;
    return formatted;
};

export const calcPoints = (size, secs) => {
    let points = 10;
    const maxSecs = SECS[size - 1];

    if (secs < maxSecs) {
        const secsLeft = maxSecs - secs;
        points = Math.round(1000 / maxSecs * secsLeft);
    }

    return Math.max(points, 10);
};

export const getWinner = (players) => {
    const [p1, p2] = players;

    if (!p1.over || !p2.over) {
        return null;
    }

    if (p1.over === LOST && p2.over === LOST) {
        return -1;
    }

    if (p1.over === LOST) {
        return 2;
    }

    if (p2.over === LOST) {
        return 1;
    }

    const s1 = Math.round(p1.secs);
    const s2 = Math.round(p2.secs);

    if (s1 < s2) {
        return 1;
    }

    if (s2 < s1) {
        return 2;
    }

    return 0;
};

export const samePos = (one, two) => one?.row === two.row && one?.col === two.col;

export const isAppleDevice = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);