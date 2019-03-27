import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getAlbum, getAlbumSuccess, getAlbumError } from '../actions/AlbumActions';
import { getImageList, getImageListSuccess, getImageListError } from '../actions/ImageListActions';
import AlbumImageList from '../components/AlbumImageList';
import ImageListFilter from '../components/ImageListFilter';

class AlbumPage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps, {clearData: false});
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props, {clearData: true});
    }

    // TODO: Вынести логику составления URL в отдельный модуль.
    navigateToImage = (image) => {
        this.props.history.push(`/image/${image.id}`);
    }

    updateDataAccordingToURL(props, options) {
        let {
            pageIndex = 0,
            pageSize = 10,
            filter = '',
        } = queryString.parse(props.location.search);
        let albumId = props.match.params.id;

        let query = {
            offset: pageIndex * pageSize,
            limit: pageSize,
            filter,
            albumId
        };

        this.props.setQuery(query, options);
    }

    updateRequest = (request) => {
        // TODO: Логику составления ссылки вынести в отдельный модуль.
        this.props.history.push(`/album/${this.props.match.params.id}/?${queryString.stringify(request)}`);
    }
    
    render() {
        // let params = this.props.match.params;
        // TODO: добавить виджет отображения информации о базе
        return (
            <div>
                {/* База: { album.id } - { album.name } */}
                <ImageListFilter updateRequest={this.updateRequest}></ImageListFilter>
                <AlbumImageList
                    navigateTo={this.navigateToImage}
                ></AlbumImageList>
                <ImageListFilter updateRequest={this.updateRequest}></ImageListFilter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query, options) => {
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getAlbum(query, options)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getAlbumSuccess(response.data)) : 
                        dispatch(getAlbumError(response.error));
                },
                (error) => {
                    dispatch(getAlbumError(error.response));
                }
            );
            dispatch(getImageList(query)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getImageListSuccess(response.data)) : 
                        dispatch(getImageListError(response.error));
                },
                (error) => {
                    dispatch(getImageListError(error.response));
                }
            );

        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
