import React from 'react';
// import { Link } from 'react-router-dom';

class ListItemContainer extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.base);
    }

    render() {
        // TODO: ссылки не должны быть зашиты в компоненте.
        // Логику составления, ссыдки нужно вынести из компоненты.
        return (
            <div onClick={this.handleClick}>
                {/* <Link to={link}>{ this.props.base.title }</Link> */}
                { this.props.base.title }
            </div>
        )
    }
}

export default ListItemContainer;
