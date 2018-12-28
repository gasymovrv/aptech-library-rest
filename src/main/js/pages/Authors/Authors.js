import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import Top from '../../components/Top';
import AuthorList from '../../components/authors/AuthorList';
import AuthorForm from '../../components/authors/AuthorForm';
import NotFound from '../../components/NotFound';
import AuthorInfo from '../../components/authors/AuthorInfo';
import MainContainer from '../../components/MainContainer';
import {checkAuthorization} from '../../api/usersApi';

export default function Authors({match, appPaths}) {
    checkAuthorization();
    const url = match.url;
    return (
        <Fragment>
            <Switch>
                <Route exact path={url} component={(props) => (<Top {...props} text='Список авторов'/>)}/>
                <Route path={`${url}/add`} component={(props) => (<Top {...props} text='Добавление нового автора'/>)}/>
                <Route path={`${url}/:id(\\d+)/edit`} component={(props) => (<Top {...props} text='Изменении информации об авторе'/>)}/>
                <Route path={`${url}/:id(\\d+)`} component={(props) => (<Top {...props} text='Информация об авторе'/>)}/>
                <Route component={()=><Top text='Неизвестная страница'/>}/>
            </Switch>
            <MainContainer>
                <Switch>
                    <Route exact path={url} component={(props) => (<AuthorList {...props} appPaths={appPaths}/>)}/>
                    <Route path={`${url}/add`} component={AuthorForm}/>
                    <Route path={`${url}/:id(\\d+)/edit`}
                           component={(props) => (<AuthorForm {...props} isEdit={true}/>)}/>
                    <Route path={`${url}/:id(\\d+)`} component={AuthorInfo}/>
                    <Route component={NotFound}/>
                </Switch>
            </MainContainer>
        </Fragment>
    )
}
