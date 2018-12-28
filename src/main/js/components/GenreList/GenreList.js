import React from 'react';
import {Link} from 'react-router-dom';


export default function GenreList({entityList, ...props}) {
    const url = props.match.url;
    let genres = entityList.map(g =>
        <li key={g.id}>
            <Link to={`${url}books/filter?genreId=${g.id}`} className='genre-link' id={g.id}>{g.name}</Link>
        </li>
    );
    return (
        <div className='col-sm-3 blog-sidebar'>
            <h4>Жанры</h4>
            <ul className='blog-categories'>{genres}</ul>
        </div>
    )
}