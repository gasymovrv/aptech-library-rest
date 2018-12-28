import React from 'react';

export default function Tab1({book}) {
    return (
        <div className='tab-pane active' id='tab1'>
            {book.descr
                ?
                <p>{book.descr}</p>
                :
                <h4>Отстутствует</h4>
            }
        </div>
    )
}