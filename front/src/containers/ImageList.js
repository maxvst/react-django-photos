import React from 'react'
import ImageListItem from '../containers/ImageListItem'

export default class ImageList extends React.Component {
    handleImageClick(image) {
        console.log ('on image clicked', image);
    }
    
    render() {
        return (
            <div>
                { this.props.imageList.map(
                    image => (
                        <ImageListItem
                            key={image.id} 
                            image={image}
                            onClick={this.handleImageClick}
                        ></ImageListItem>
                    )
                )}
            </div>
        );
    }
}
