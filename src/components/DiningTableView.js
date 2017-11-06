import React, {Component} from 'react';

export default class DiningTableView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rTable = this.props.table.table;
        if (rTable) {
            return (<span>{this.props.table.table.name}</span>);
        } else {
            return (<span/>);
        }
    }

}