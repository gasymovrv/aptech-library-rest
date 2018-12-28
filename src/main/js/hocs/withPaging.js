import React from 'react';
import Pagination from 'react-js-pagination';

import getDisplayName from '../helpers/getDisplayName';

export default function withPaging(itemsCountPerPage) {
    return function (Component) {
        class PaginationContainer extends React.Component {
            state = {
                activePage: 1,
                itemsCountPerPage: itemsCountPerPage || 6
            };

            handlePageChange = (pageNumber) => {
                this.setState({activePage: pageNumber});
                this.props.loadEntities(pageNumber, this.state.itemsCountPerPage);
            };

            refreshPageAfterDelete = ()=>{
                const {activePage, itemsCountPerPage} = this.state;
                const {entityList, loadEntities} = this.props;
                //переходим на предыдущую страницу, если в момент удаления был только 1 элемент
                if (entityList.length === 1 && activePage > 1) {
                    this.setState((state, props) => {
                        loadEntities(state.activePage - 1, itemsCountPerPage);
                        return {activePage: state.activePage - 1}
                    });
                } else {
                    loadEntities(activePage, itemsCountPerPage);
                }
            };

            componentDidMount() {
                const {activePage, itemsCountPerPage} = this.state;
                this.props.loadEntities(activePage, itemsCountPerPage);
            }

            render() {
                const {activePage, itemsCountPerPage} = this.state;
                //убираем лишнее из пропсов(loadEntities)
                const {totalItemsCount, loadEntities, ...rest} = this.props;
                return (
                    <Component
                        {...rest}
                        refreshPageAfterDelete={this.refreshPageAfterDelete}>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </Component>
                )
            }
        }
        PaginationContainer.displayName = `withPagingEntities(${getDisplayName(Component)})`;
        return PaginationContainer;
    };
}