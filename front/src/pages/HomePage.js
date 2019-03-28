import React from 'react';

export default class HomePage extends React.Component {
      
    componentWillReceiveProps(nextProps) { // or componentDidUpdate
        if (nextProps.match.params.id !== this.props.match.params.id) {
            fetch(nextProps.match.params.id)
        }
    }

    render() {
        return (
            <h1> this is Home page</h1>
        );
    }
};
