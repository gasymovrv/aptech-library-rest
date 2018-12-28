import React from 'react';
import {Link} from 'react-router-dom';
import {checkAuthorization, getLocalCurrentUser, isAdmin, isAuthorizeUser} from '../../../api/usersApi';

export default function Links({appPaths, onLogout}) {
    checkAuthorization();
    let currentUserIsUser = false;
    let currentUserIsAdmin = false;
    let currentUserIsAnonymous = true;
    let currentUser = getLocalCurrentUser();
    if(currentUser){
        currentUserIsAnonymous = false;
        if(isAdmin()){
            currentUserIsAdmin = true;
        } else if(isAuthorizeUser()){
            currentUserIsUser = true;
        }
    }
    return (
        <div className='menuextras'>
            <div className='extras'>
                {currentUserIsAnonymous &&
                <ul>
                    <li>
                        <i className='glyphicon glyphicon-user icon-white'/>
                        <Link to={appPaths.auth.login}> Авторизация</Link>
                    </li>
                </ul>}
                {currentUserIsUser &&
                <ul>
                    <li>
                        <i className='glyphicon glyphicon-user icon-white'/>
                        <Link to={appPaths.auth.account}> Личный кабинет</Link>
                    </li>
                    <li>
                        <i className='glyphicon glyphicon-log-out icon-white'/>
                        <a href='' onClick={onLogout}> Выйти</a>
                    </li>
                </ul>}
                {currentUserIsAdmin &&
                <ul>
                    <li>
                        <i className='glyphicon glyphicon-user icon-white'/>
                        <Link to={appPaths.auth.account}> Личный кабинет администратора</Link>
                    </li>
                    <li>
                        <i className='glyphicon glyphicon-log-out icon-white'/>
                        <a href='' onClick={onLogout}> Выйти</a>
                    </li>
                </ul>}
            </div>
        </div>
    )
}
