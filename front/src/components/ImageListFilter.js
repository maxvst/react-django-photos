import { connect } from 'react-redux';
import ListFilter from '../containers/ListFilter'

const mapStateToProps = state => ({
    request: state.album.request.params,
    total: state.album.response.total
});

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
