import { connect } from 'react-redux';
// import List from '../containers/List'
import ImageList from '../containers/ImageList';

const mapStateToProps = state => ({
    list: state.albumList.response.result
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
