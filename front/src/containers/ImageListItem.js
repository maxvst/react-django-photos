import React from 'react';
import './ImageListItem.css';
import classNames from 'classnames';

export default class ImageListItem extends React.Component {
    render() {
        // TODO: вынести формирование url в подходящий для этого модуль
        return (
            <div 
                className={classNames ("image-list-item", this.props.className)}
                onClick={() => {this.props.onClick(this.props.image)}}
            >
                <span className="image-label">
                    <span className="label">{this.props.image.title}</span>
                </span>
                <div className="image-container">
                    <img
                        className="image"
                        src={this.props.image.url}
                        alt={this.props.image.title}
                    ></img>
                </div>
            </div>
        )
    }
}
