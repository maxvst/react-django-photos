import React from 'react'
import ListItem from './ListItem'

export default class AlbumList extends React.Component {    
    render() {
        // TODO: в ListItem заменить album на что-то нейтральное, 
        // например на item, чтобы иенование свойств контенера не 
        // зависило от области применения
        return (
            <div>
                { this.props.list.map(
                    album => (
                        <ListItem
                            key={album.id} 
                            album={album}
                            onClick={this.props.navigateTo}
                        ></ListItem>
                    )
                )}
            </div>
        );
    }
}
