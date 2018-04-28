import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";
import ScrollBar from "../../widgets/ScrollBar";
import Column from "../../widgets/Column";

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
        // if (parentHeight < height) {
        //     console.log("Parent: " + parentHeight + ", Son: " + height + ", DO need");
        // } else {
        //     console.log("Parent: " + parentHeight + ", Son: " + height + ", NO need");
        // }
        this.setState({
            scrollbarNeeded: parentHeight < height
        });
    }

    updateScrollBar() {
        let height = global.$("#" + this.state.uuid).height();
        let parentHeight = global.$("#" + this.state.uuid).parent().height();
        this.setState({
            scrollbarNeeded: parentHeight < height
        });
    }

    componentWillReceiveProps() {
        this.updateScrollBar();
    }

    componentDidUpdate(prevProps, prevState) {
        let height = global.$("#" + this.state.uuid).height();
        let parentHeight = global.$("#" + this.state.uuid).parent().height();
        // if (parentHeight < height) {
        //     console.log("Parent: " + parentHeight + ", Son: " + height + ", DO need");
        // } else {
        //     console.log("Parent: " + parentHeight + ", Son: " + height + ", NO need");
        // }
        if (prevState.scrollbarNeeded && height <= parentHeight ||
            !prevState.scrollbarNeeded && height > parentHeight) {
            // console.log("Change scroll status");
            this.setState({
                scrollbarNeeded: parentHeight < height,
                percent: 0
            });
        }
        if (prevProps.scrollPulse !== this.props.scrollPulse) {
            this.setState({
                percent: 1
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