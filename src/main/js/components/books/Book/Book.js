import React from 'react';
import {Link} from 'react-router-dom';
import roundNumbers from '../../../helpers/roundNumbers';

export default function Book({book, onEdit, onDelete, appPaths, currentUserIsAdmin, ...props}) {
    const url = props.match.url;
    const imgPath = `data:image/jpeg;base64,${book.image}`;
    const bookInfoLocation = {
        pathname: `${url}/${book.id}`,
        state: {entity: {...book}}
    };
    const isFree = book.price === 0.0;

    return (
        <div className='col-sm-4'>
            <div className='shop-item'>

                <div className='image'>
                    <Link to={bookInfoLocation}>
                        <img className='img-rounded' src={imgPath}/>
                    </Link>
                </div>

                <div className='title'>
                    <h3>
                        <Link to={bookInfoLocation}>
                            {book.name}
                        </Link>
                    </h3>
                </div>

                <div className='title'>
                    <h3>
                        <Link to={`${appPaths.authors}/${book.author.id}`}>
                            {book.author.fio}
                        </Link>
                    </h3>
                </div>

                <div className='title'>
                    <h3>Жанр:
                        <Link to={bookInfoLocation}>
                            {book.genre.name}
                        </Link>
                    </h3>
                    <h3>Год издания:
                        <Link to={bookInfoLocation}>
                            {book.publishYear}
                        </Link>
                    </h3>
                    <h3>Просмотров:
                        <Link to={bookInfoLocation}>
                            {book.views}
                        </Link>
                    </h3>
                </div>

                <div className='price'>
                    {isFree ? 'БЕСПЛАТНО' : roundNumbers(book.price, 2) + ' р.'}
                </div>

                <div className='actions'>
                    <div className='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>
                        <div className='btn-group-lg bottom-indent' role='group' aria-label='First group'>
                            {isFree ||
                            <button
                                // onClick="confirmAddToCart(${book.id}, '${book.name}')"
                                className='btn item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='В корзину'>
                                <i className='glyphicon glyphicon-shopping-cart icon-white'/>
                            </button>
                            }
                            <button
                                // onClick="confirmShowBookContent(${book.id}, '${book.name}', ${book.price})"
                                className='btn item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Читать'>
                                <i className='glyphicon glyphicon-eye-open icon-white'/>
                            </button>
                        </div>
                    </div>
                    <div className='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>
                        <div className='btn-group-lg bottom-indent' role='group' aria-label='Second group'>
                            {currentUserIsAdmin &&
                            <button
                                className='btn admin-button item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Изменить'
                                onClick={() => onEdit(book)}>
                                <i className='glyphicon glyphicon-pencil icon-white'/>
                            </button>
                            }
                            {currentUserIsAdmin &&
                            <button
                                // onClick="confirmDeleteBook(${book.id}, '${book.name}')"
                                className='btn admin-button item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Удалить'
                                onClick={() => onDelete(book)}>
                                <i className='glyphicon glyphicon-trash icon-white'/>
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}