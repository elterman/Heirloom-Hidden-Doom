import { useAtom } from 'jotai';
import { a_lang } from './atoms';

export const EN = 'en';
export const ES = 'es';
export const PT = 'pt';
export const RU = 'ru';

export const S_AVE = 'ave';
export const S_BEST = 'best';
export const S_BEST_SCORE = 'best score!';
export const S_BOTH_DEAD = 'both dead!';
export const S_DEAD = 'dead!';
export const S_ITS_DRAW = 'it\'s a draw!';
export const S_ITS_OVER = 'it\'s over!';
export const S_LOST = 'lost';
export const S_OFFLINE = 'you\'re offline.';
export const S_OPP_JOINED = 'player joined!';
export const S_OPP_LEFT = 'opponent left!';
export const S_P1_WON = 'player 1 won!';
export const S_P2_WON = 'player 2 won!';
export const S_PLAYS = 'plays';
export const S_PLAY_AGAIN = 'play more?';
export const S_RESET_STATS = 'reset stats?';
export const S_RESUME = 'resume';
export const S_SCORE = 'score';
export const S_START = 'start';
export const S_WAITING_FOR_START = 'waiting for the start.';
export const S_WON = 'won';
export const S_YOU = 'YOU';
export const S_YOU_LOST = 'you lost.';
export const S_YOU_WON = 'you won!';

const useLang = () => {
    const [l] = useAtom(a_lang);

    const className = l === RU ? 'RC' : '';

    const str = (s) => {
        if (l === EN) {
            return s;
        }

        switch (s) {
            case S_AVE:
                return l === ES ? 'med.' : l === PT ? 'med.' : l === RU ? 'СРЕД.' : s;
            case S_BEST:
                return l === ES ? 'mejor' : l === PT ? 'melhor' : l === RU ? 'РЕКОРД' : s;
            case S_BEST_SCORE:
                return l === ES ? '¡récord!' : l === PT ? 'melhor pontuação!' : l === RU ? 'ЛИЧНЫЙ РЕКОРД!' : s;
            case S_BOTH_DEAD:
                return l === ES ? '¡ambos muertos!' : l === PT ? 'ambos mortos!' : l === RU ? 'ОБА ПРОПАЛИ!' : s;
            case S_DEAD:
                return l === ES ? '¡¡muerto!!' : l === PT ? 'morto!!' : l === RU ? 'ПРОПАЛ!' : s;
            case S_ITS_DRAW:
                return l === ES ? '¡es un empate!' : l === PT ? 'é um empate!' : l === RU ? 'НИЧЬЯ!' : s;
            case S_ITS_OVER:
                return l === ES ? '¡se acabó el juego!' : l === PT ? 'o jogo acabou!' : l === RU ? 'КОНЕЦ ИГРЫ!' : s;
            case S_LOST:
                return l === ES ? 'perd.' : l === PT ? 'der.' : l === RU ? 'ПРОИГР.' : s;
            case S_OFFLINE:
                return l === ES ? '¡estás desconectado!' : l === PT ? 'você está offline!' : l === RU ? 'ВЫ НЕ В СЕТИ!' : s;
            case S_OPP_JOINED:
                return l === ES ? '¡jugador ha entrado!' : l === PT ? 'jogador entrou!' : l === RU ? 'ИГРОК ПРИСОЕДИНИЛСЯ!' : s;
            case S_OPP_LEFT:
                return l === ES ? '¡el oponente se fue!' : l === PT ? 'oponente saiu!' : l === RU ? 'СОПЕРНИК УШЕЛ!' : s;
            case S_P1_WON:
                return l === ES ? '¡el jugador 1 ganó!' : l === PT ? 'o jogador 1 ganhou!' : l === RU ? 'ПЕРВЫЙ ВЫИГРАЛ!' : s;
            case S_P2_WON:
                return l === ES ? '¡el jugador 2 ganó!' : l === PT ? 'o jogador 2 ganhou!' : l === RU ? 'ВТОРОЙ ВЫИГРАЛ!' : s;
            case S_PLAYS:
                return l === ES ? 'juegos' : l === PT ? 'jogos' : l === RU ? 'ИГР' : s;
            case S_PLAY_AGAIN:
                return l === ES ? '¿jugar más?' : l === PT ? 'jogar mais?' : l === RU ? 'ИГРАТЬ ЕЩЁ?' : s;
            case S_RESET_STATS:
                return l === ES ? '¿reiniciar estadisticas?' : l === PT ? 'redefinir estatísticas?' : l === RU ? 'CБРОСИТЬ СТАТИСТИКУ?' : s;
            case S_RESUME:
                return l === ES ? 'reanudar' : l === PT ? 'retomar' : l === RU ? 'ПРОДОЛЖИТь' : s;
            case S_SCORE:
                return l === ES ? 'punt.' : l === PT ? 'pont.' : l === RU ? 'СЧЁТ' : s;
            case S_START:
                return l === ES ? 'iniciar' : l === PT ? 'iniciar' : l === RU ? 'СТАРТ' : s;
            case S_WAITING_FOR_START:
                return l === ES ? 'esperando el inicio.' : l === PT ? 'esperando el inicio.' : l === RU ? 'ЖДЁМ НАЧАЛА ИГРЫ.' : s;
            case S_WON:
                return l === ES ? 'gan.' : l === PT ? 'venc.' : l === RU ? 'ВЫИГР.' : s;
            case S_YOU:
                return l === ES ? 'TÚ' : l === PT ? 'TU' : l === RU ? 'ВЫ' : s;
            case S_YOU_LOST:
                return l === ES ? 'perdiste.' : l === PT ? 'você perdeu.' : l === RU ? 'ВЫ ПРОИГРАЛИ.' : s;
            case S_YOU_WON:
                return l === ES ? '¡ganaste!' : l === PT ? 'você ganhou!' : l === RU ? 'ПОБЕДА!' : s;
            default: break;
        }

        return s;
    };

    return { str, className, lang: l };
};

export default useLang;