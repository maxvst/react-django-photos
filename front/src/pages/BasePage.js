import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getBase, getBaseSuccess, getBaseError } from '../actions/BaseActions';
import ImageList from '../components/BaseImageList';
import ImageListFilter from '../components/ImageListFilter';

class BasePage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps);
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props);
    }

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
        let params = this.props.match.params;
        return (
            <div>
                База: { params.id }
                <ImageListFilter baseId={params.id} history={this.props.history}></ImageListFilter>
                <ImageList
                    navigateTo={this.navigateToImage}
                ></ImageList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        basesPage: state.basePage
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
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);

