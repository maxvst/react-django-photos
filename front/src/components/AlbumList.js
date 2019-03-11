import { connect } from 'react-redux';
import ImageList from '../containers/ImageList';

const mapStateToProps = state => ({
    list: state.albumList.response.result
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
