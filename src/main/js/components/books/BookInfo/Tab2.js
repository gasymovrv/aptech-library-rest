import React, {Fragment} from 'react';

export default function Tab2({book}) {
    return (
        <div className='tab-pane active' id='tab2'>
            <table>
                <tbody>
                <tr>
                    <td>Автор</td>
                    <td>{book.author.fio}</td>
                </tr>
                <tr>
                    <td>Жанр</td>
                    <td>{book.genre.name}</td>
                </tr>
                {/*<tr>*/}
                {/*<td>Издательство</td>*/}
                {/*<td>{book.publisher.name}</td>*/}
                {/*</tr>*/}
                <tr>
                    <td>Год издания</td>
                    <td>{book.publishYear}</td>
                </tr>
                <tr>
                    <td>Количество страниц</td>
                    <td>{book.pageCount}</td>
                </tr>
                <tr>
                    <td>ISBN</td>
                    <td>{book.isbn}</td>
                </tr>
                {book.contentType &&
                <Fragment>
                    <tr>
                        <td>Расширение файла</td>
                        <td>{book.fileExtension}</td>
                    </tr>
                    <tr>
                        <td>Размер файла</td>
                        <td>{book.fileSize}</td>
                    </tr>
                </Fragment>
                }
                <tr>
                    <td>Рейтинг</td>
                    <td>{book.rating}</td>
                </tr>
                <tr>
                    <td>Количестов голосов</td>
                    <td>{book.voteCount}</td>
                </tr>
                <tr>
                    <td>Количестов просмотров</td>
                    <td>{book.views}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}