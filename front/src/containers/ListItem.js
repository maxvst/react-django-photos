import React from 'react';
import './ListItem.css';
// import { Link } from 'react-router-dom';

export default class ListItem extends React.Component {
    render() {
        return (
            <div className="List-item" onClick={() => { this.props.onClick(this.props.base)}}>
                {/* <Link to={link}>{ this.props.base.title }</Link> */}
                { this.props.base.title }
            </div>
        )
    }
}
