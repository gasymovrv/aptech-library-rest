import React from 'react';
import {Link} from 'react-router-dom';
import roundNumbers from '../../../helpers/roundNumbers';
import InfoBox from '../../InfoBox/InfoBox';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

export default function BookInfo({entity: book, onEdit, onDelete, successDelete, onToggleTab, activeTab, showInfo, callbackStopShow}) {
    const imgPath = `data:image/jpeg;base64,${book.image}`;
    const isFree = book.price === 0.0;
    let tab;
    if(activeTab === 1){
        tab = <Tab1 book={book}/>
    } else if(activeTab===2){
        tab = <Tab2 book={book}/>
    }
    return (
        <div className='container'>
            <div className='row'>
                <InfoBox infoKey={book.id}
                         successAction={successDelete}
                         errorText='Произошла ошибка при попытке удалить данную книгу!'
                         show={showInfo}
                         callbackStopShow={callbackStopShow}
                         timeout={7}
                />
                <div className='col-sm-4'>
                    <div className='product-image-large'>
                        <img className='img-rounded' src={imgPath} alt='Изображение'/>
                    </div>
                </div>
                <div className='col-sm-7 product-details'>
                    <h4>{book.name}</h4>
                    <div className='price'>
                        {isFree ? 'БЕСПЛАТНО' : roundNumbers(book.price, 2) + ' р.'}
                    </div>

                    <h5>Действия</h5>
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
                            <button
                                // onClick="confirmDownloadBookContent(${book.id}, '${book.name}', ${book.price})"
                                className='btn item-actions neighboring-buttons'
                                role='button'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Скачать'>
                                <i className='glyphicon glyphicon-download icon-white'/>
                            </button>
                            {/*<security:authorize access="hasRole('ROLE_ADMIN')">*/}
                            <button
                                className='btn admin-button item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Изменить'
                                onClick={onEdit}>
                                <i className='glyphicon glyphicon-pencil icon-white'/>
                            </button>
                            <button
                                // onClick="confirmDeleteBook(${book.id}, '${book.name}')"
                                className='btn admin-button item-actions neighboring-buttons'
                                data-placement='top'
                                data-toggle='popover'
                                data-content='Удалить'
                                onClick={() => onDelete(book)}>
                                <i className='glyphicon glyphicon-trash icon-white'/>
                            </button>
                            {/*</security:authorize>*/}
                        </div>
                    </div>
                </div>

                <div className='col-sm-12'>
                    <div className='tabbable'>
                        <ul className='nav nav-tabs product-details-nav'>
                            <li className={activeTab===1 ? 'active' : ''} onClick={onToggleTab(1)}><a>Аннотация</a></li>
                            <li className={activeTab===2 ? 'active': ''} onClick={onToggleTab(2)}><a>Сведения</a></li>
                        </ul>
                        <div className='tab-content product-detail-info'>
                            {tab}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}