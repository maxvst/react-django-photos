import React from 'react';
// import queryString from 'query-string';
import { connect } from 'react-redux';
import { getImage, getImageSuccess, getImageError } from '../actions/ImageActions';
import Image from '../components/Image.js';

class ImagePage extends React.Component {
    // TODO: Удостовериться, что обновлять данные в соответствии с новым URL
    // следует именно в методах componentWillReceiveProps и componentWillMount
    componentWillReceiveProps(newProps) {
        this.updateDataAccordingToURL(newProps, {clearData: true});
    }

    componentWillMount() {
        this.updateDataAccordingToURL(this.props, {clearData: true});
    }

    updateDataAccordingToURL(props, options) {
        let imageId = props.match.params.id;
        this.props.setQuery({imageId}, options);
    }
    
    render() {
        return (
            <Image></Image>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        imagePage: state.imagePage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setQuery: (query, options) => {
            // TODO: при создании нового запроса отменить старый промис, если он еще не выполнен
            dispatch(getImage(query, options)).payload.promise.then(
                (response) => {
                    !response.error ? 
                        dispatch(getImageSuccess(response.data)) : 
                        dispatch(getImageError(response.error));
                },
                (error) => {
                    dispatch(getImageError(error.response));
                }
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
