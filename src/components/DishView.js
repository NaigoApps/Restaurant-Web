import React, {Component} from 'react';

export default class DishView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dish = this.props.dish;
        var classname = "";
        switch (dish.status) {
            case "ATTIVO":
                classname = "text-success";
                break;
            case "RIMOSSO":
                classname = "text-danger";
                break;
            case "SOSPESO":
                classname = "text-warning";
                break;
            default:
                classname = "text-info";
                break;
        }
        return (
            <span className={classname}>
                {dish.name}
                {dish.description ? "*" : ""}
            </span>
        );
    }

}