import React from 'react'
import ListItem from './ListItem'

export default class BaseList extends React.Component {    
    render() {
        return (
            <div>
                { this.props.baseList.map(
                    base => (
                        <ListItem
                            key={base.id} 
                            base={base}
                            onClick={this.props.navigateTo}
                        ></ListItem>
                    )
                )}
            </div>
        );
    }
}
