import { connect } from 'react-redux';
import List from '../containers/List'

const mapStateToProps = state => ({
    baseList: state.bases.response.result
})

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
