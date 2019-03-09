import React from 'react';
import './ListItem.css';
// import { Link } from 'react-router-dom';

export default class ListItem extends React.Component {
    render() {
        return (
            <div className="List-item" onClick={() => { this.props.onClick(this.props.album)}}>
                {/* <Link to={link}>{ this.props.album.title }</Link> */}
                { this.props.album.title }
            </div>
        )
    }
}
