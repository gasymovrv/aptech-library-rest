import React from 'react';
import Author from '../Author';
import InfoBox from '../../InfoBox';
import {isAdmin} from '../../../api/usersApi';

export  default function AuthorList({entityList, deletedEntity, successDelete, children, onAdd, onDelete, showInfo, callbackStopShow, ...props}) {
    const currentUserIsAdmin = isAdmin();
    const authors = entityList.map(a =>
        <Author key={a.id} author={a} currentUserIsAdmin={currentUserIsAdmin} onDelete={onDelete} {...props}/>
    );
    return (
        <div className='col-sm-9'>
            <InfoBox infoKey={deletedEntity.id}
                     successAction={successDelete}
                     successText={`Информация об авторе ${deletedEntity.fio} успешно удалена!`}
                     errorText={`Произошла ошибка при попытке удалить информацию об авторе ${deletedEntity.fio}!`}
                     show={showInfo}
                     callbackStopShow={callbackStopShow}
                     timeout={7}
            />
            {currentUserIsAdmin &&
            <div className='row'>
                <div className='col-sm-2'>
                    <button
                        className='btn btn-md admin-button'
                        onClick={onAdd}>
                        Добавить автора
                    </button>
                </div>
            </div>
            }
            <div className='row'>{authors}</div>
            <div className='row flex-center'>{children}</div>
        </div>
    )
}

