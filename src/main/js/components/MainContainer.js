import React from 'react';

export default function NotFound({children}) {
    return (
        <div className='section'>
            <div className='container'>
                <div className='row flex-center'>
                    {children}
                </div>
            </div>
        </div>
    );
}
