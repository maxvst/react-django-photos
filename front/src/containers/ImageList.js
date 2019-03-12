import React from 'react';
import ImageListItem from '../containers/ImageListItem';
import './ImageList.css';

export default class ImageList extends React.Component {
    render() {
        return (
            <div className="image-list">
                { this.props.list.map(
                    image => (
                        <ImageListItem
                            className="image-list__image-list-item"
                            key={image.id} 
                            image={image}
                            onClick={this.props.navigateTo}
                        ></ImageListItem>
                    )
                )}
            </div>
        );
    }
}
