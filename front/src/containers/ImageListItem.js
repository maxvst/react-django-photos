import React from 'react';

export default class ImageListItem extends React.Component {
    render() {
        return (
            <img
                src={`data:image/jpeg;base64,${this.props.image.image}`}
                alt={this.props.image.title}
                onClick={() => {this.props.onClick(this.props.image)}}
            ></img>
        )
    }
}
