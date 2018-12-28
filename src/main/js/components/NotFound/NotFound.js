import React from 'react';
import error from './404.gif'

export default function NotFound() {
    return (
        <div className='col-sm-9'>
            <img src={error}/>
        </div>
    );
}
