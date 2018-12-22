import React, {Component} from 'react';

export default class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let buttons = React.Children.toArray(this.props.children);
        if (this.props.vertical) {
            return <div className="btn-group-vertical">{buttons}</div>
        } else {
            return <div className="btn-group">{buttons}</div>
        }
    }

}