import { useAtom } from 'jotai';
import { a_lang } from './atoms';
import { windowSize } from './utils';

const Help = () => {
    const [lang] = useAtom(a_lang);
    const es = { fontSize: '18px' };
    const pt = { fontSize: '18px' };
    const ru = { fontFamily: 'Roboto Condensed', fontWeight: 'normal' };

    const content = {
        'en': <>
            <div>How quickly can you find the precious <span className='coin'>coin</span> hidden in the grid?</div>
            <div><span className='rose'>Roses</span> mark either the <span className='coin'>coin</span> or a <span className='trap'>death trap</span>.</div>
            <div>Tap a <span className='rose'>rose</span> if you think it hides the <span className='coin'>coin</span>. Otherwise, tap an empty cell.</div>
            <div><span className='trap'>Death traps</span> may move with each tap, but the <span className='coin'>coin</span> stays in the same spot.</div>
        </>,
        'es': <>
            <div style={es}>¿Cuán rápido puedes encontrar la <span className='coin'>moneda</span> preciosa escondida en la cuadrícula?</div>
            <div style={es}>Las <span className='rose'>rosas</span> marcan ya sea la <span className='coin'>moneda</span> o una <span className='trap'>trampa mortal</span>.</div>
            <div style={es}>Toca una <span className='rose'>rosa</span> si crees que esconde la <span className='coin'>moneda</span>. De lo contrario, toca una celda vacía.</div>
            <div style={es}>Las <span className='trap'>trampas mortales</span> pueden moverse con cada toque, pero la <span className='coin'>moneda</span> permanece en el mismo lugar.</div>
        </>,
        'pt': <>
            <div style={pt}>Quão rapidamente você pode encontrar a <span className='coin'>moeda</span> preciosa escondida na grade?</div>
            <div style={pt}>As <span className='rose'>rosas</span> marcam ou a <span className='coin'>moeda</span> ou uma <span className='trap'>armadilha mortal</span>.</div>
            <div style={pt}>Toque em uma <span className='rose'>rosa</span> se você acha que ela esconde a <span className='coin'>moeda</span>. Caso contrário, toque em uma célula vazia.</div>
            <div style={pt}>As <span className='trap'>armadilhas mortais</span> podem se mover a cada toque, mas a <span className='coin'>moeda</span> permanece no mesmo lugar.</div>
        </>,
        'ru': <>
            <div style={ru}>Как быстро вы сможете найти драгоценную <span className='coin'>монету</span>, спрятанную в сетке?</div>
            <div style={ru}><span className='rose'>Розы</span> указывают либо на <span className='coin'>монету</span>, либо на <span className='trap'>смертельную ловушку</span>.</div>
            <div style={ru}>Нажмите на <span className='rose'>розу</span>, если считаете, что она скрывает <span className='coin'>монету</span>. В противном случае, нажмите на пустую ячейку.</div>
            <div style={ru}><span className='trap'>Смертельные ловушки</span> могут менять положение с каждым нажатием, но <span className='coin'>монета</span> всегда остаётся на месте.</div>
        </>,
    };

    const { y: wy } = windowSize();
    const fontSize = wy < 600 ? '17px' : '20px';

    return <div className='help-content' style={{ fontSize }}>{content[lang]}</div>;
};

export default Help;