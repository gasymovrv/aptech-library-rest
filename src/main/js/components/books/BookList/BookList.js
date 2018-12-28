import React from 'react';
import Book from '../Book';
import InfoBox from '../../InfoBox';
import {isAdmin} from "../../../api/usersApi";

export default function BookList({entityList, deletedEntity, successDelete, children, onAdd, onDelete, showInfo, callbackStopShow, ...props}) {
    const currentUserIsAdmin =  isAdmin();
    const books = entityList.map(b =>
        <Book key={b.id} book={b} currentUserIsAdmin={currentUserIsAdmin} onDelete={onDelete} {...props}/>
    );
    return (
        <div className='col-sm-9'>
            <InfoBox infoKey={deletedEntity.id}
                     successAction={successDelete}
                     successText={`Книга ${deletedEntity.name} успешно удалена!`}
                     errorText={`Произошла ошибка при попытке удалить книгу ${deletedEntity.name}!`}
                     show={showInfo}
                     callbackStopShow={callbackStopShow}
                     timeout={7}
            />
            <div className='row'>{books}</div>
            <div className='row flex-center'>{children}</div>
        </div>
    );
}