import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";
import $ from 'jquery';
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/draggable'

export default class Scrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "scrollable_" + uuid()
        }
    }

    componentDidMount() {
        $("#" + this.state.uuid).draggable({
            axis: "y",
            drag: function (event, ui) {
                ui.position.top = Math.min(0, ui.position.top);
                ui.position.top = Math.max(ui.position.top, ui.helper.parent().height() - ui.helper.height());
            }
        });
    }

    render() {
        return <div className="draggable-container">
            <div id={this.state.uuid} className="draggable-content">
                {this.props.children}
            </div>
        </div>;
    }
}