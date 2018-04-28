import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import Keyboard from "./inputs/Keyboard";

export default class ApplicationKeyboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <PopupContainer visible={this.props.visible}>
            <Keyboard/>
        </PopupContainer>;
    }
}