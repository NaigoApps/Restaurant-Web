import React, {Component} from 'react';
import Column from "./Column";

export default class ColumnSpace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Column>
                <span className="button-padding"/>
            </Column>
        );
    }

}