import React from 'react';
import {createNewUser} from '../../../api/usersApi';
import InfoBox from '../../InfoBox/InfoBox';

export default class Registration extends React.Component{
    state = {
        email: '',
        name: '',
        lastName: '',
        password1: '',
        password2: '',
        successSubmit: undefined,
        showInfo: false,
        errorText: 'Не получилось зарегистрироваться!'
    };

    submitHandler = (event) => {
        event.preventDefault();
        const {email, name, lastName, password1, password2} = this.state;
        const {appPaths, history} = this.props;
        if(password1 !== password2){
            this.setState({
                showInfo: true,
                errorText: 'Пароли не совпадают'
            });
            return;
        }
        const user = {
            email: email,
            name: name,
            lastName: lastName,
            password: password2,
            roles: [{role:'ROLE_USER'}]
        };
        createNewUser(user)
            .then((resp) => {
                if (resp.status !== 200) {
                    this.setState({
                        errorText: 'Ошибка при отправке данных',
                        successSubmit: false,
                        showInfo: true
                    });
                    return null;
                } else {
                    return resp.json();
                }
            })
            .then((respUserDto) => {
                if (respUserDto) {
                    if (respUserDto.errors && respUserDto.errors.length>0) {
                        this.setState({
                            errorText: 'Не получилось зарегистрироваться',
                            successSubmit: false,
                            showInfo: true
                        });
                    } else {
                        this.setState({
                            email: '',
                            name: '',
                            lastName: '',
                            password1: '',
                            password2: '',
                        });
                        history.push({
                            pathname: appPaths.auth.login,
                            state: {
                                successSubmit: true,
                                showInfo: true
                            }
                        });
                    }
                }
            });

    };

    changeHandler = ()=> (event) => {
        const {name, value} = event.target;
        let user = {...this.state};
        user[name] = value;

        if(this.isCompleteInputs(user) && this.submitButton){
            this.submitButton.removeAttribute('disabled');
        } else if(this.submitButton){
            this.submitButton.setAttribute('disabled', true);
        }
        this.setState({[name]: value});

    };

    callbackStopShow = () => {
        this.setState({showInfo: false})
    };

    isCompleteInputs = (user) => {
        const {email, name, lastName, password2} = user;
        let inputs = [email, name, lastName, password2];
        return inputs.every((elem)=>!!elem);
    };

    refSubmitButton = (node) => {
        this.submitButton = node;
    };

    render() {
        const {email, name, lastName, password1, password2, successSubmit, showInfo, errorText} = this.state;
        return (
            <div className='col-sm-5'>
                <InfoBox infoKey='login-info'
                         successAction={successSubmit}
                         errorText={errorText}
                         timeout={7}
                         show={showInfo}
                         callbackStopShow={this.callbackStopShow}
                />
                <div className='basic-login'>
                    <form name='form_login' onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='login-email'><i className='icon-user'/> <b>E-Mail<sup style={{color: 'red'}}>*</sup></b></label>
                            <input className='form-control user-validation'
                                   id='login-email'
                                   type='text'
                                   name='email'
                                   value={email}
                                   onChange={this.changeHandler()}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='login-name'><i className='icon-lock'/> <b>Имя<sup style={{color: 'red'}}>*</sup></b></label>
                            <input className='form-control user-validation'
                                   id='login-name'
                                   name='name'
                                   type='text'
                                   value={name}
                                   onChange={this.changeHandler()}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='login-lastName'><i className='icon-lock'/> <b>Фамилия<sup style={{color: 'red'}}>*</sup></b></label>
                            <input className='form-control'
                                   id='login-lastName'
                                   name='lastName'
                                   type='text'
                                   value={lastName}
                                   onChange={this.changeHandler()}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='login-password1'><i className='icon-lock'/> <b>Пароль<sup style={{color: 'red'}}>*</sup></b></label>
                            <input className='form-control'
                                   id='login-password1'
                                   name='password1'
                                   type='password'
                                   value={password1}
                                   onChange={this.changeHandler()}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='login-password2'><i className='icon-lock'/> <b>Повторите пароль<sup style={{color: 'red'}}>*</sup></b></label>
                            <input className='form-control user-validation'
                                   id='login-password2'
                                   name='password2'
                                   type='password'
                                   value={password2}
                                   onChange={this.changeHandler()}/>
                        </div>
                        <div className='form-group'>
                            <span id='submit-new-user' className='d-inline-block pull-right' data-placement='top' data-toggle='popover'>
                                <button ref={this.refSubmitButton} disabled type='submit' className='btn'>
                                    Зарегистрироваться
                                </button>
                            </span>
                            <div className='clearfix'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
