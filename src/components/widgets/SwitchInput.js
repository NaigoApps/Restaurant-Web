import React, {Component} from 'react';
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import Switch from "./Switch";

export default class SwitchInput extends Component {
    constructor(props) {
        super(props);
    }

    onToggle(value){
        if(this.props.onToggle){
            this.props.onToggle(value);
        }
    }

    render() {
        let value = this.props.value;
        const leftText = !value || !this.props.rightText ? <b>{this.props.leftText}</b> : this.props.leftText;
        const rightText = this.props.rightText && value ? <b>{this.props.rightText}</b> : this.props.rightText;
        let leftCol;
        if(leftText){
            leftCol = <Column auto>
                <label>{leftText}</label>
            </Column>;
        }
        let rightCol;
        if(rightText){
            rightCol = <Column auto>
                <label>{rightText}</label>
            </Column>;
        }
        return <Row align="center">
            {leftCol}
            <Column auto>
                <Switch
                    leftBg={this.props.leftBg}
                    rightBg={this.props.rightBg}
                    leftText={this.props.leftText}
                    rightText={this.props.rightText}
                    value={this.props.value}
                    onToggle={value => this.onToggle(value)}/>
            </Column>
            {rightCol}
        </Row>;
    }

}