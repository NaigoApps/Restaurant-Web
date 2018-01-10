import React, {Component} from 'react';
import {uuid} from "../utils/Utils";

import $ from "jquery";

export default class ScrollBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "scroll-bar-" + uuid()
        }
    }

    componentDidMount(prevProps, prevState) {
        let height = $("#" + this.state.uuid).parent().height();
        $("#" + this.state.uuid).css("top", this.props.percent * (height - 16) + 4);
    }

    componentDidUpdate(prevProps, prevState) {
        let height = $("#" + this.state.uuid).parent().height();
        $("#" + this.state.uuid).css("top", this.props.percent * (height - 16) + 4);
    }

    render() {
        const percent = this.props.percent;
        const active = this.props.active;

        return (
            <div className="ml-auto scrollbar">
                <div id={this.state.uuid} hidden={!this.props.visible} className="scrollbar-dot"/>
            </div>
        );
    }

}