import React from 'react';


export default function Top({text}) {
    return (
        <div className='section section-breadcrumbs'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>{text}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
