import React, {Component} from 'react';

export default class NavPills extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="nav nav-pills">
                {this.props.children}
            </ul>
        );
    }

}