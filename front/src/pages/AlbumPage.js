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
        this.updateDataAccordingToURL(newProps);
        console.log ('eee');
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props);
        console.log ('bbb');
    }

    // TODO: Вынести логику составления URL в отдельый модуль.
    navigateToImage = (image) => {
        this.props.history.push(`/image/${image.id}`);
    }

    updateDataAccordingToURL(props) {
        let {
            pageIndex = 0,
            pageSize = 10,
            filter = null,
        } = queryString.parse(props.location.search);
        let albumId = props.match.params.id;

        let query = {
            offset: pageIndex * pageSize,
            limit: pageSize,
            filter,
            albumId
        };

        this.props.setQuery(query);
    }
    
    render() {
        // console.log ('!!!!!props: ', this.props);
        let params = this.props.match.params;
        // TODO: доавить виджет отображения информации о базе
        return (
            <div>
                {/* База: { album.id } - { album.name } */}
                <ImageListFilter albumId={params.id} history={this.props.history}></ImageListFilter>
                <AlbumImageList
                    navigateTo={this.navigateToImage}
                ></AlbumImageList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query) => {
            console.log('setQuery', query);
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getAlbum(query)).payload.promise.then(
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
