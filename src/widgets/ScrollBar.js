import React, {Component} from 'react';
import {uuid} from "../utils/Utils";

import $ from "jquery";

const DOT_SIZE = 40;
const DOT_MARGIN = 2;

export default class ScrollBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "scroll-bar-" + uuid(),
            dragging: false
        }
    }

    componentDidMount(prevProps, prevState) {
        let scrollBarComponent = $("#" + this.state.uuid);
        let height = scrollBarComponent.parent().height();
        scrollBarComponent.css("top", this.props.percent * (height - DOT_SIZE - 2 * DOT_MARGIN) + DOT_MARGIN);

        let component = this;

        global.$("#" + this.state.uuid).draggable({
            axis: "y",
            drag: function (event, ui) {
                ui.position.top = Math.max(DOT_MARGIN, ui.position.top);
                ui.position.top = Math.min(ui.position.top, ui.helper.parent().height() - ui.helper.height() - DOT_MARGIN);

                component.props.onScroll(ui.position.top / (ui.helper.parent().height() - ui.helper.height()));
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let scrollBarComponent = $("#" + this.state.uuid);
        let height = scrollBarComponent.parent().height();
        scrollBarComponent.css("top", this.props.percent * (height - DOT_SIZE - 2 * DOT_MARGIN) + DOT_MARGIN);
    }

    render() {
        return (
            <div className="ml-auto scrollbar">
                <div id={this.state.uuid} className="scrollbar-dot" hidden={!this.props.visible}/>
            </div>
        );
    }

}