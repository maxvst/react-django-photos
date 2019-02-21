import React from 'react'
import { connect } from 'react-redux'
import ImageListItemContainer from '../containers/ImageListItemContainer'

// TODO: Объединить ImageList и BaseList единую компоненту.
class ImageList extends React.Component {
    // TODO: поднять обработку клика по картинке по крайней мере до этого уровня
    handleImageClick(image) {
        console.log ('on image clicked', image);
    }
    
    render() {
        return (
            <div>
                { this.props.imageList.map(
                    image => (
                        <ImageListItemContainer 
                            key={image.id} 
                            image={image}
                            onClick={this.handleImageClick}
                        ></ImageListItemContainer>
                    )
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    imageList: state.base.response.result
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
