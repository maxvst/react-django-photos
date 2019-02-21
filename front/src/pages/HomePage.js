import React from 'react';

export default class HomePage extends React.Component {
    componentWillMount() { // or componentDidMount
        console.log ('will mount:', this);
        // fetch(this.props.match.params.id)
    }
      
    componentWillReceiveProps(nextProps) { // or componentDidUpdate
        console.log ('will receive:', this);
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
