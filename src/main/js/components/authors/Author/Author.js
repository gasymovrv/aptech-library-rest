import React from 'react';
import {Link} from 'react-router-dom';

export default function Author({author, onEdit, onDelete, currentUserIsAdmin, ...props}) {
    const url = props.match.url;
    const authorInfoLocation = {
        pathname: `${url}/${author.id}`,
        state: {
            entity: {...author},
        }
    };
    return (
        <div className='col-sm-4'>
            <div className='shop-item'>
                <div className='title'>
                    <h3>
                        <Link to={authorInfoLocation}>{author.fio}</Link>
                    </h3>
                </div>
                <div className='title'>
                    <h3>Дата рождения:
                        {author.birthday ? author.birthday : 'Неизвестна'}
                    </h3>
                </div>
                {/*<div className="title">*/}
                {/*<h3>Количество книг: {author.books.length}</h3>*/}
                {/*</div>*/}
                <div className='title'>
                    <h3>Просмотры книг: {author.views}</h3>
                </div>
                <div className='actions'>
                    {currentUserIsAdmin &&
                    <button
                        className='btn admin-button item-actions'
                        data-placement='top'
                        data-toggle='popover'
                        data-content='Изменить'
                        onClick={() => onEdit(author)}>
                        <i className='glyphicon glyphicon-pencil icon-white'/>
                    </button>
                    }
                    {currentUserIsAdmin &&
                    <button
                        className='btn admin-button item-actions neighboring-buttons'
                        data-placement='top'
                        data-toggle='popover'
                        data-content='Удалить'
                        onClick={() => onDelete(author)}>
                        <i className='glyphicon glyphicon-trash icon-white'/>
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}
