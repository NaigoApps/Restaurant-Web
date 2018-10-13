import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Tile extends Component {
    constructor(props) {
        super(props);
    }

    computeStyle() {
        return {
            backgroundColor: this.props.color,
            flexGrow: this.props.size
        }
    }

    onClick(){
        this.props.commitAction && this.props.commitAction();
    }

    render() {
        return <div className="tile" style={this.computeStyle()} onClick={() => this.onClick()}/>;
    }

}