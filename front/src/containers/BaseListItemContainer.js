import React from 'react';
import { Link } from 'react-router-dom';

class BaseListItemContainer extends React.Component {
    render() {
        // TODO: ссылки не должны быть зашиты в компоненте.
        // Логику составления, ссыдки нужно вынести из компоненты.
        const link = `/base/${this.props.base.id}`;
        return (
            <div>
                <Link to={link}>{ this.props.base.title }</Link>
            </div>
        )
        // return (
        //     <div onClick={() => {this.props.onClick(this.props.base)}}>
        //         { this.props.base.title }
        //     </div>
        // );
    }
}

export default BaseListItemContainer;
