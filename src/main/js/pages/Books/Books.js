import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import Top from '../../components/Top';
import Letters from '../../components/Letters';
import BookList from '../../components/books/BookList';
import GenreList from '../../components/GenreList';
import NotFound from '../../components/NotFound';
import BookInfo from '../../components/books/BookInfo';
import MainContainer from '../../components/MainContainer';
import {checkAuthorization} from '../../api/usersApi';

export default function Books({match, appPaths}) {
    checkAuthorization();
    const url = match.url;
    return (
        <Fragment>
            <Switch>
                <Route exact path={url} component={(props) => (<Top {...props} text='Список книг'/>)}/>
                <Route path={`${url}/:id(\\d+)`} component={(props) => (<Top {...props} text='Информация о книге'/>)}/>
                <Route component={() => <Top text='Неизвестная страница'/>}/>
            </Switch>
            <Route exact path={url} component={Letters}/>
            <MainContainer>
                <Route exact path={url} component={GenreList}/>
                <Switch>
                    <Route exact path={url} component={(props) => (<BookList {...props} appPaths={appPaths}/>)}/>
                    <Route path={`${url}/:id(\\d+)`} component={BookInfo}/>
                    <Route component={NotFound}/>
                </Switch>
            </MainContainer>
        </Fragment>
    )
}
