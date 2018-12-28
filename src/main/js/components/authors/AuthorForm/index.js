import {branch, compose, withHandlers, withState} from 'recompose';
import React from 'react';


import AuthorForm from './AuthorForm';
import withForm from '../../../hocs/withForm';
import {findAuthorById, saveOrUpdateAuthor} from '../../../api/authorsApi';
import withFindById from '../../../hocs/withFindById';

const withHandleForm = compose(
    withHandlers({
        onSubmit: props => (data, okFn, errFn) => {
            saveOrUpdateAuthor(data, okFn, errFn);
        }
    }),
    withState('entity', null, {
        fio: '',
        birthday: null
    }),
    branch(
        ({isEdit}) => isEdit,
        //если isEdit=true, то просто сначала достаем существующий объект
        withFindById(
            (onFind, id) => {
                findAuthorById(
                    (entity) => {
                        if (entity.birthday) {
                            entity.birthday = new Date(entity.birthday);
                        }
                        onFind(entity);
                    },
                    id
                );
            }),
        //если isEdit=false, то делаем на лету хок и пробрасываем (типо ничего не делаем)
        (Component) => {
            return (props) => <Component {...props}/>
        }
    ),
    withForm
);
export default compose(withHandleForm)(AuthorForm);