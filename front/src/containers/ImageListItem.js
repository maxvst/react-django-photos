import React from 'react';

export default class ImageListItem extends React.Component {
    render() {
        // console.log ('image:', this.props.image)
        // TODO: вынести формирование url в подходящий для этого модуль
        return (
            <img
                src={`/api/images/${this.props.image.id}/small`}
                alt={this.props.image.title}
                onClick={() => {this.props.onClick(this.props.image)}}
            ></img>
        )
    }
}
