import { atom } from 'jotai';
import _ from 'lodash';
import { APP_STATE, MIN_GAME_DIMENSION, START_PAGE } from './const';
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
export const a_selected = atom(null);

const a_page_base = atom(START_PAGE);
const a_reset_stats_base = atom(false);
const a_alert_base = atom(null);
const a_paused_base = atom();

const a_app_state_base = atom({ states: {} });

export const a_app_state = atom(
    get => {
        const state = get(a_app_state_base);
        return state;
    },

    (get, set, appState) => {
        set(a_app_state_base, appState);

        const json = JSON.stringify(appState, ['1', '2', '3', '4', '5', 'sounds', 'states', 'stats', 'plays', 'total_points', 'best_points']);

        localStorage.setItem(APP_STATE, json);
    }
);

export const a_state = atom(
    get => {
        const appState = get(a_app_state);
        const key = get(a_size);
        const state = _.get(appState?.states, key, {});
        return state;
    },

    (get, set, state) => {
        const appState = get(a_app_state);
        const key = get(a_size);
        _.set(appState.states, key, state);
        set(a_app_state, { ...appState });
    }
);

export const a_sounds = atom(
    get => {
        const on = get(a_app_state).sounds;
        return on !== false;
    },
    (get, set, sounds) => set(a_app_state, { ...get(a_app_state), sounds })
);

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
    const { plays, best_points } = get(a_stats);
    return plays > 1 && get(a_points) === best_points;
});

export const a_stats = atom(
    get => get(a_state).stats || { plays: 0, total_points: 0, best_points: 0 },
    (get, set, stats) => set(a_state, { ...get(a_state), stats })
);

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
