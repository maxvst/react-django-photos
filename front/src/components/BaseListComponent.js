import React from 'react'
import { connect } from 'react-redux'
import ListItemContainer from '../containers/ListItemContainer'

class BaseList extends React.Component {    
    render() {
        return (
            <div>
                { this.props.baseList.map(
                    base => (
                        <ListItemContainer 
                            key={base.id} 
                            base={base}
                            onClick={this.props.navigateTo}
                        ></ListItemContainer>
                    )
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    baseList: state.bases.response.result
})

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseList)
