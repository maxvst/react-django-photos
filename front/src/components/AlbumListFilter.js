import { connect } from 'react-redux';
import ListFilter from '../containers/ListFilter'

const mapStateToProps = state => ({
    request: state.albumList.request.params,
    total: state.albumList.response.total
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
