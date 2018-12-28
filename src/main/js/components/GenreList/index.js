import {compose} from 'recompose';

import GenreList from './GenreList';
import {findAllGenres} from '../../api/genresApi';
import withLoadingEntities from '../../hocs/withLoadingEntities';

const withLoading = compose(
    withLoadingEntities(findAllGenres, false)
);
export default compose(withLoading)(GenreList);