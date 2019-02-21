import React from 'react';
import { connect } from 'react-redux';
import BaseList from '../components/BaseList.js';
import BaseListFilter from '../components/BaseListFilter';
import queryString from 'query-string';
import { getBases, getBasesSuccess, getBasesError } from '../actions/BasesActions';

class BaseListPage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps);
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props);
    }

    updateDataAccordingToURL(props) {
        let {
            pageIndex = 0,
            pageSize = 10,
            filter = null
        } = queryString.parse(props.location.search);

        let query = {
            offset: pageIndex * pageSize,
            limit: pageSize,
            filter
        };

        this.props.setQuery(query);
    }
    
    render() {
        // console.log ('this base list page', this);
        return (
            <div>
                <BaseListFilter history={this.props.history}></BaseListFilter>
                <BaseList></BaseList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        basesPage: state.basesPage
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query) => {
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getBases(query)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getBasesSuccess(response.data)) : 
                        dispatch(getBasesError(response.error));
                },
                (error) => {
                    dispatch(getBasesError(error.response));
                }
            );
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BaseListPage);
