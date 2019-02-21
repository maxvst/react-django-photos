import React from 'react';
import { Link } from 'react-router-dom';

class ImageListItemContainer extends React.Component {
    render() {
        // TODO: ссылки не должны быть зашиты в компоненте.
        // Логику составления, ссыдки нужно вынести из компоненты.
        const link = `/image/${this.props.image.id}`;
        return (
                <Link to={link}>
                    <img
                        src={`data:image/jpeg;base64,${this.props.image.image}`}
                        alt={this.props.image.title}
                    ></img>
                </Link>
        )
        // return (
        //     <div onClick={() => {this.props.onClick(this.props.image)}}>
        //         { this.props.image.title }
        //     </div>
        // );
    }
}

export default ImageListItemContainer;
