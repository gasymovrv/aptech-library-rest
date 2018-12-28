import React from 'react';
import {getLocalCurrentUser, loginUser, setLocalCurrentUser} from '../../../api/usersApi';
import InfoBox from '../../InfoBox/InfoBox';
import {Link} from 'react-router-dom';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        let resultShowInfo = false;
        let resultSuccess = undefined;
        if(props.location && props.history && props.location.state && props.history.action === 'PUSH'){
            resultShowInfo = props.location.state.showInfo;
            resultSuccess = props.location.state.successSubmit;
        }
        this.state = {
            email: '',
            password: '',
            successSubmit: resultSuccess,
            showInfo: resultShowInfo
        };
    }


    submitHandler = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        const {appPaths, history} = this.props;
        const isExistUser = !!getLocalCurrentUser();
        if(isExistUser){
            history.push(appPaths.auth.account)
        }
        loginUser(email, password)
            .then((resp) => {
                if (resp.status !== 200) {
                    this.setState({
                        successSubmit: false,
                        showInfo: true
                    });
                    return null;
                } else {
                    return resp.json();
                }
            })
            .then((respUser) => {
                if (respUser) {
                    this.setState({
                        email:'',
                        password:'',
                    });
                    setLocalCurrentUser(respUser);
                    history.push({
                        pathname: appPaths.auth.account,
                        state: {
                            successSubmit: true,
                            showInfo: true
                        }
                    });
                }
            });

    };

    changeHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    callbackStopShow = () => {
        this.setState({
            showInfo: false,
            externalShowInfo: false
        })
    };

    render() {
        const {email, password, successSubmit, showInfo} = this.state;
        const {appPaths} = this.props;

        return (
            <div className='col-sm-5'>
                <InfoBox infoKey='login-info'
                         successAction={successSubmit}
                         errorText='Неверный логин или пароль!'
                         successText='Вы успешно зарегистрировались!'
                         timeout={7}
                         show={showInfo}
                         callbackStopShow={this.callbackStopShow}
                />
                <div className='basic-login'>
                    <form name='form_login' onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='login-email'><i className='icon-user'/> <b>E-Mail</b></label>
                            <input className='form-control'
                                   id='login-email'
                                   type='text'
                                   name='email'
                                   value={email}
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='login-password'><i className='icon-lock'/> <b>Пароль</b></label>
                            <input className='form-control'
                                   id='login-password'
                                   name='password'
                                   type='password'
                                   value={password}
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn pull-right'>Войти</button>
                            <div className='clearfix'/>
                        </div>
                    </form>
                    <div className='not-member'>
                        <p>Еще нет аккаунта? <Link to={appPaths.auth.registration}>Зарегистрируйтесь здесь</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}
