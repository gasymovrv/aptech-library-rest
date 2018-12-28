import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Top from '../../components/Top';
import NotFound from '../../components/NotFound';
import MainContainer from '../../components/MainContainer';
import Login from '../../components/authorization/Login';
import Account from '../../components/authorization/Account';
import {checkAuthorization, getLocalCurrentUser} from '../../api/usersApi';
import Registration from '../../components/authorization/Registration';

export default function Auth({appPaths}) {
    // const url = match.url;
    checkAuthorization();
    const isExistUser = getLocalCurrentUser();
    return (
        <Fragment>
            <Switch>
                {!isExistUser &&
                    <Redirect exact from={appPaths.auth.account} to={appPaths.auth.login}/>
                }
                {isExistUser &&
                    <Redirect exact from={appPaths.auth.login} to={appPaths.auth.account}/>
                }
                {isExistUser &&
                    <Redirect exact from={appPaths.auth.registration} to={appPaths.auth.account}/>
                }
                <Route exact path={appPaths.auth.login} component={(props) => (<Top {...props} text='Авторизация'/>)}/>
                <Route exact path={appPaths.auth.registration} component={(props) => (<Top {...props} text='Регистрация'/>)}/>
                <Route exact path={appPaths.auth.account} component={(props) => (<Top {...props} text='Личный кабинет'/>)}/>
                <Route component={()=><Top text='Неизвестная страница'/>}/>
            </Switch>
            <MainContainer>
                <Switch>
                    <Route exact path={appPaths.auth.login} component={(props) => (<Login {...props} appPaths={appPaths}/>)}/>
                    <Route exact path={appPaths.auth.registration} component={(props) => (<Registration {...props} appPaths={appPaths}/>)}/>
                    <Route exact path={appPaths.auth.account} component={(props) => (<Account {...props} appPaths={appPaths}/>)}/>
                    <Route component={NotFound}/>
                </Switch>
            </MainContainer>
        </Fragment>
    )
}
