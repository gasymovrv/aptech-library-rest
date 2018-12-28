import React from 'react';
import logo from './BeSmart-logo.svg' // relative path to image
import {Link} from 'react-router-dom';
import AuthLinks from '../authorization/AuthLinks';

export default function Header({watchText, isActiveWatch, onToggleWatch, appPaths, ...props}) {
    return (
        <div className='mainmenu-wrapper'>
            <div className='container'>
                <AuthLinks appPaths={appPaths} {...props}/>
                <nav id='mainmenu' className='mainmenu'>
                    <ul>
                        <li className='logo-wrapper'>
                            <Link to={appPaths.root}><img src={logo} alt='Изображение не найдено'/></Link>
                        </li>
                        <li>
                            <Link to={appPaths.books}>Все книги</Link>
                        </li>
                        <li>
                            <Link to={appPaths.authors}>Авторы</Link>
                        </li>
                        <li>
                            <Link to={appPaths.aboutUs}>О нас</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
