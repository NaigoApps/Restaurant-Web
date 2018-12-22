import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";
import ScrollBar from "../../widgets/ScrollBar";
import Column from "../../widgets/Column";
import ColumnSeparator from "../../widgets/ColumnSeparator";

export default class Scrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "scrollable_" + uuid(),
            percent: 0,
            scrollbarNeeded: false
        }
    }

    componentDidMount() {
        const component = this;
        global.$("#" + this.state.uuid).draggable({
            cancel: "",
            axis: "y",
            drag: function (event, ui) {
                ui.position.top = Math.max(ui.position.top, ui.helper.parent().height() - ui.helper.height());
                ui.position.top = Math.min(0, ui.position.top);
                component.setState({
                    percent: ui.position.top / (ui.helper.parent().height() - ui.helper.height())
                });
            }
        });

        let height = global.$("#" + this.state.uuid).height();
        let parentHeight = global.$("#" + this.state.uuid).parent().height();
        this.setState({
            scrollbarNeeded: parentHeight < height
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let height = global.$("#" + this.state.uuid).height();
        let parentHeight = global.$("#" + this.state.uuid).parent().height();
        if (prevState.scrollbarNeeded && height <= parentHeight ||
            !prevState.scrollbarNeeded && height > parentHeight) {
            this.setState({
                scrollbarNeeded: parentHeight < height,
                percent: 0
            });
        }
        if (prevProps.scrollPulse !== this.props.scrollPulse) {
            this.setState({
                percent: this.props.position !== undefined ? this.props.position : 1
            });
        }
        this.updatePosition();
    }

    updatePosition() {
        let children = global.$("#" + this.state.uuid);
        let parent = children.parent();
        if (this.state.scrollbarNeeded) {
            children.css('top', (this.state.percent * (parent.height() - children.height())) + "px");
        } else {
            children.css('top', "0");
        }
    }

    render() {
        return <div className="row draggable-container d-flex align-items-stretch h-100">
            <Column>
                <div id={this.state.uuid} className="draggable-content">
                    {this.props.children}
                </div>
            </Column>
            <ColumnSeparator hidden/>
            <Column auto>
                <ScrollBar
                    visible={this.state.scrollbarNeeded}
                    percent={this.state.percent}
                    onScroll={(percent) => this.onScroll(percent)}
                />
            </Column>
        </div>;
    }

    onScroll(percent) {
        this.setState({
            percent: percent
        })
    }
}