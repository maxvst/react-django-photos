import React from 'react';
import { connect } from 'react-redux';
import AlbumList from '../components/AlbumList';
import AlbumListFilter from '../components/AlbumListFilter';
import queryString from 'query-string';
import { getAlbums, getAlbumsSuccess, getAlbumsError } from '../actions/AlbumsActions';

class AlbumListPage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps);
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props);
    }

    // TODO: Вынести логику составления URL в отдельный модуль.
    navigateToAlbum = (album) => {
        this.props.history.push(`/album/${album.id}`);
    }

    updateRequest = (request) => {
        // TODO: Логику составления ссылки вынести в отдельный модуль.
        this.props.history.push('/?'+queryString.stringify(request));        
    }

    updateDataAccordingToURL(props) {
        let {
            pageIndex = 0,
            pageSize = 10,
            filter = ''
        } = queryString.parse(props.location.search);

        let query = {
            offset: pageIndex * pageSize,
            limit: pageSize,
            filter
        };

        this.props.setQuery(query);
    }
    
    render() {
        return (
            <div>
                <AlbumListFilter updateRequest={this.updateRequest}></AlbumListFilter>
                <AlbumList
                    navigateTo={this.navigateToAlbum}
                ></AlbumList>
                <AlbumListFilter updateRequest={this.updateRequest}></AlbumListFilter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        albumsPage: state.albumsPage
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query) => {
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getAlbums(query)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getAlbumsSuccess(response.data)) : 
                        dispatch(getAlbumsError(response.error));
                },
                (error) => {
                    dispatch(getAlbumsError(error.response));
                }
            );
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AlbumListPage);
