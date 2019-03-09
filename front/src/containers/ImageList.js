import React from 'react'
import ImageListItem from '../containers/ImageListItem'

export default class ImageList extends React.Component {
    render() {
        console.log ('!!!! list:', this.props.list);
        return (
            <div>
                { this.props.list.map(
                    image => (
                        <ImageListItem
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
