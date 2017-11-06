import React, {Component} from 'react';

export default class WaiterView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const waiter = this.props.waiter;
        let className = "";
        switch (waiter.status){
            case "ATTIVO":
                className = "text-success";
                break;
            case "RIMOSSO":
                className = "text-danger";
                break;
            case "SOSPESO":
                className = "text-warning";
                break;
            default:
                className = "text-info";
                break;
        }
        return (
            <span className={className}>
                {waiter.name} {waiter.surname}
            </span>
        );
    }

}