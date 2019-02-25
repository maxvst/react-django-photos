import React from 'react';
// import { Link } from 'react-router-dom';

class BaseListItemContainer extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.base);
    }

    render() {
        // TODO: ссылки не должны быть зашиты в компоненте.
        // Логику составления, ссыдки нужно вынести из компоненты.
        return (
            <div>
                {/* <Link to={link}>{ this.props.base.title }</Link> */}
                <a onClick={this.handleClick}>{ this.props.base.title }</a>
            </div>
        )
    }
}

export default BaseListItemContainer;
