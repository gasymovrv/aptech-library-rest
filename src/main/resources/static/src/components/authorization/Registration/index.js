import Registration from './Registration';

export default Registration;

// export default compose(
//     lifecycle({
//         componentWillMount(){
//             const {history, appPaths} = this.props;
//             //Эта проверка обнулит локального юзера,
//             // если он не авторизован на сервере
//             // или оставит пустым если был пуст
//             checkAuthorization();
//             let user = getLocalCurrentUser();
//             if(user){
//                 history.push(appPaths.auth.account);
//             }
//         }
//     })
// )(Registration);