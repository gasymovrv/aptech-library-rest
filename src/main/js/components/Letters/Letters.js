import React from 'react';


export default function Letters() {
    const ruLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    const letters = ruLetters.map(ch =>
        <button key={ch} className='btn btn-sm neighboring-buttons'>{ch}</button>
    );
    return (
        <div className='container flex-center'>
            <div className='row'>
                <div className='col-sm-12'>
                    <div id='letters-form'>
                        <div className='btn-group-sm' role='group' aria-label='First group'>
                            {letters}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
