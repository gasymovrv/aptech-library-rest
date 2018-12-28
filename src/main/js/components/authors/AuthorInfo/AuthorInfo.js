import React from 'react';
import {Link} from 'react-router-dom';
import InfoBox from '../../InfoBox';

export default function AuthorInfo({entity: author, onEdit, onDelete, successDelete, showInfo, callbackStopShow}) {
    return (
        <div className='container'>
            <div className='row'>
                <InfoBox infoKey={author.id}
                         successAction={successDelete}
                         errorText='Произошла ошибка при попытке удалить информацию о данном авторе!'
                         show={showInfo}
                         callbackStopShow={callbackStopShow}
                         timeout={7}
                />
                <div className='col-sm-7 product-details'>
                    <h4>{author.fio}</h4>

                    <h5>Действия</h5>
                    <div className='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>
                        <div className='btn-group-lg bottom-indent' role='group' aria-label='First group'>
                            {/*<security:authorize access="hasRole('ROLE_ADMIN')">*/}
                            <button
                                className='btn admin-button item-actions'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Изменить'
                                onClick={onEdit}>
                                <i className='glyphicon glyphicon-pencil icon-white'/>
                            </button>
                            <button
                                className='btn admin-button item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Удалить'
                                onClick={() => onDelete(author)}>
                                <i className='glyphicon glyphicon-trash icon-white'/>
                            </button>
                            {/*</security:authorize>*/}
                        </div>
                    </div>
                </div>

                <div className='col-sm-12'>
                    <div className='tabbable'>
                        <ul className='nav nav-tabs product-details-nav'>
                            <li className='active'><a>Сведения</a></li>
                        </ul>
                        <div className='tab-content product-detail-info'>
                            <div className='tab-pane active'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>ФИО</td>
                                            <td>{author.fio}</td>
                                        </tr>
                                        <tr>
                                            <td>Дата рождения</td>
                                            <td>{author.birthday ? author.birthday : 'Неизвестна'}</td>
                                        </tr>
                                        <tr>
                                            <td>Просмотры книг</td>
                                            <td>{author.views}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}