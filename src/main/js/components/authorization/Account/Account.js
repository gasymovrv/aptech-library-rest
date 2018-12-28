import React from 'react';
import InfoBox from '../../InfoBox/InfoBox';
import {checkAuthorization, getLocalCurrentUser} from '../../../api/usersApi';

// function checkBeforeRender(history, appPaths) {
//     consoleLogObjectStandart('history in Account.js', history);
//     consoleLogObjectStandart('appPaths in Account.js', appPaths);
//     //Эта проверка обнулит локального юзера,
//     // если он не авторизован на сервере
//     // или оставит пустым если был пуст
//     checkAuthorization();
//     let user = getLocalCurrentUser();
//     consoleLogObjectStandart('user in Account.js', user);
//     if(!user){
//         consoleLogObjectStandart('user before history.push', user);
//         history.push(appPaths.auth.login);
//     }
// }

export default function Account({location, history, appPaths}) {
    // checkBeforeRender(history, appPaths);
    let successSubmit, showInfo;
    //props.history.action === 'PUSH' - это исключает вход в условие при обновлении страницы (там action='POP')
    if(location && history && location.state && history.action === 'PUSH'){
        successSubmit = location.state.successSubmit;
        showInfo = location.state.showInfo;
    }
    const user = getLocalCurrentUser();
    if(!user){
        history.push(appPaths.auth.login);
    }
    return (
        <div className='col-sm-9'>
            <InfoBox infoKey='login-info'
                     successAction={successSubmit}
                     errorText='Неверный логин или пароль!'
                     successText='Вы успешно авторизовались!'
                     timeout={7}
                     show={showInfo}
            />
            <h4>Личная информация</h4>
            <table>
                <colgroup>
                    <col style={{width: '50%'}}/>
                    <col style={{width: '30%'}}/>
                    <col style={{width: '20%'}}/>
                </colgroup>
                <tbody>
                <tr>
                    <td>Ваш email</td>
                    <td>{user.email}</td>
                    <td/>
                </tr>
                <tr>
                    <td>Имя</td>
                    <td>{user.name}</td>
                    <td/>
                </tr>
                <tr>
                    <td>Фамилия</td>
                    <td>{user.lastName}</td>
                    <td/>
                </tr>
                <tr>
                    <td>Средств на счету</td>
                    <td>0 р.</td>
                    <td>
                        <a className='btn item-actions' role='button'>
                            Пополнить
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Количество заказов</td>
                    <td>0</td>
                    <td/>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
