import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getBase, getBaseSuccess, getBaseError } from '../actions/BaseActions';
import { getImageList, getImageListSuccess, getImageListError } from '../actions/ImageListActions';
import BaseImageList from '../components/BaseImageList';
import ImageListFilter from '../components/ImageListFilter';

class AlbumPage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps);
        // console.log ('eee');
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props);
        // console.log ('bbb');
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
        let baseId = props.match.params.id;

        let query = {
            offset: pageIndex * pageSize,
            limit: pageSize,
            filter,
            baseId
        };

        this.props.setQuery(query);
    }
    
    render() {
        // console.log ('props: ', this.props);
        let params = this.props.match.params;
        // let base = this.props.base;
        // TODO: доавить виджет отображения информации о базе
        return (
            <div>
                {/* База: { base.id } - { base.name } */}
                <ImageListFilter baseId={params.id} history={this.props.history}></ImageListFilter>
                <BaseImageList
                    navigateTo={this.navigateToImage}
                ></BaseImageList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // base: state.base.response
        // basesPage: state.basePage
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query) => {
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getBase(query)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getBaseSuccess(response.data)) : 
                        dispatch(getBaseError(response.error));
                },
                (error) => {
                    dispatch(getBaseError(error.response));
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
