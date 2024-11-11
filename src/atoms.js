import { atom } from 'jotai';
import { MIN_GAME_DIMENSION, START_PAGE } from './const';
import { defer } from './utils';

export const a_lang = atom(null);
export const a_dimension = atom(get => get(a_size) + MIN_GAME_DIMENSION - 1);
export const a_board_size = atom(null);
export const a_points = atom(1000);
export const a_secs = atom(0);
export const a_step = atom(1);
export const a_size = atom(null);
export const a_over = atom(false);
export const a_tile_sets = atom([]);
export const a_tap = atom(null);
export const a_tick_time = atom(null);

const a_page_base = atom(START_PAGE);
const a_reset_stats_base = atom(false);
const a_alert_base = atom(null);
const a_paused_base = atom();

export const a_alert = atom(
    get => get(a_alert_base),
    (get, set, { alert, duration = 2000 }) => {
        set(a_alert_base, alert);
        set(a_reset_stats, false);

        if (alert && duration) {
            defer(() => set(a_alert_base, null), duration);
        }
    }
);

export const a_page = atom(
    get => get(a_page_base),

    (get, set, page) => {
        set(a_page_base, page);
    }
);

export const a_reset_stats = atom(
    get => get(a_reset_stats_base),
    (get, set, on) => {
        set(a_reset_stats_base, on);
    }
);

export const a_best_points = atom(get => {
    const { plays, best_points } = get(a_solo_stats);
    return plays > 1 && get(a_points) === best_points;
});

export const a_solo_stats = atom({ plays: 0, total_points: 0, best_points: 0 })

export const a_paused = atom(
    get => {
        const paused = get(a_paused_base);
        return paused === undefined || paused;
    },
    (get, set, paused) => set(a_paused_base, paused)
);

export const a_tiles = atom(get => {
    const sets = get(a_tile_sets);
    const i = get(a_step) - 1;
    return sets[i];
});

export const a_can_click = atom(get => !get(a_paused));
