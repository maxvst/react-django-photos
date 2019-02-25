import { connect } from 'react-redux';
import ImageList from '../containers/ImageList';

const mapStateToProps = state => ({
    imageList: state.base.response.result
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
