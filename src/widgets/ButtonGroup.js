import React, {Component} from 'react';
import Column from "./Column";
import Row from "./Row";
import {uuid} from "../utils/Utils";

export default class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let buttons = React.Children.toArray(this.props.children);

        return (
            <Row>
                {buttons.map(button => {
                    if(this.props.vertical){
                        return <Row key={uuid()}>
                            <Column>
                                {button}
                            </Column>
                        </Row>
                    }else{
                        return <Column key={uuid()} auto>
                            {button}
                        </Column>
                    }
                })}
            </Row>
        );
    }

}