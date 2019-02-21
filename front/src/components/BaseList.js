import React from 'react'
import { connect } from 'react-redux'
import BaseListItemContainer from '../containers/BaseListItemContainer'

class BaseList extends React.Component {
    handleBaseClick(base) {
        console.log ('on base clicked', base);
    }
    
    render() {
        return (
            <div>
                { this.props.baseList.map(
                    base => (
                        <BaseListItemContainer 
                            key={base.id} 
                            base={base}
                            onClick={this.handleBaseClick}
                        ></BaseListItemContainer>
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
