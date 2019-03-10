import React from 'react'
import { connect } from 'react-redux'

// TODO: Объединить ImageList и AlbumList единую компоненту.
class Image extends React.Component {
    // TODO: поднять обработку клика по картинке по крайней мере до этого уровня
    handleImageClick(image) {
        console.log ('on image clicked', image);
    }
    
    render() {
        const image = this.props.image;
        // TODO: вынести составление URL картинки в соответствующий модуль
        return (
            <div>
                <h1> Название: { image.title } </h1>
                <h2> База: { image.album } </h2>
                { image.id && 
                    <img
                        src={`/api/images/${image.id}/native`}
                        alt={image.title}
                    ></img>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    image: state.image.response
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)
