import React from 'react';
import Calendar from 'react-calendar';
import InfoBox from '../../InfoBox';

export default function AuthorForm({data, savedData, oldData, onSubmit, onReset, onChange, onChangeDate, isEdit, successSubmit, showInfo, callbackStopShow}) {
    // const url = props.match.url;
    const {fio, birthday} = data;
    const successViewFio = isEdit ? oldData.fio : savedData.fio;
    const errorViewFio = isEdit ? savedData.fio : fio;
    const successText = isEdit ? 'отредактирована' : 'добавлена';
    const errorText = isEdit ? 'изменить информацию об' : 'добавления информации о новом';
    return (
        <div className='col-sm-9'>
            <InfoBox infoKey='author-form-info'
                     successAction={successSubmit}
                     successText={`Информация об авторе ${successViewFio} успешно ${successText}!`}
                     errorText={`Произошла ошибка при попытке ${errorText} авторе ${errorViewFio}!`}
                     show={showInfo}
                     callbackStopShow={callbackStopShow}
                     timeout={7}
            />
            <form onSubmit={onSubmit} onReset={onReset}>
                <div className='form-group row'>
                    <label htmlFor='fio' className='col-sm-2 col-form-label'>
                        Полное имя<sup style={{color: 'red'}}>*</sup>
                    </label>
                    <div className='col-sm-10'>
                        <input
                            id='fio'
                            name='fio'
                            type='text'
                            className='form-control'
                            value={fio}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className='form-group row'>
                    <label htmlFor='birthday' className='col-sm-2 col-form-label'>
                        Дата рождения
                    </label>
                    <div className='col-sm-10'>
                        <Calendar
                            id='birthday'
                            value={birthday}
                            locale='ru-RU'
                            onChange={onChangeDate('birthday')}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                {/*<div className="form-group">*/}
                {/*<label htmlFor="books">Выберите книги данного автора</label>*/}
                {/*<div>*/}
                {/*<select className="form-control" id="books" name="books" multiple="multiple" size="6">*/}
                {/*<c:forEach var="b" items="${bookList}">*/}

                {/*<c:choose>*/}
                {/*<c:when test="${customFn:contains(author.books, b)}">*/}
                {/*<option selected value="${b.id}">${b.name}</option>*/}
                {/*</c:when>*/}
                {/*<c:otherwise>*/}
                {/*<option value="${b.id}">${b.name}</option>*/}
                {/*</c:otherwise>*/}
                {/*</c:choose>*/}

                {/*</c:forEach>*/}
                {/*</select>*/}
                {/*</div>*/}
                {/*<small className="form-text text-muted">*/}
                {/*<sup>*</sup> Если у книги уже был указан автор, то он заменится на текущего*/}
                {/*</small>*/}
                {/*</div>*/}
                <div className='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>
                    <div className='btn-group-sm pull-right' role='group' aria-label='First group'>
                        <button type='submit' className='btn btn-sm'>Сохранить</button>
                        <button type='reset' className='btn btn-sm neighboring-buttons'>Отмена</button>
                    </div>
                </div>
            </form>
        </div>
    );

}