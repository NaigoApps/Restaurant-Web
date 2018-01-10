import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";
import ScrollBar from "../../widgets/ScrollBar";

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
        this.setState({
            scrollbarNeeded: parentHeight < height
        });

        global.$("body").on("css-update", this.updateScrollBar.bind(this));
    }

    componentWillUnmount(){
        global.$("body").off("css-update");
    }

    updateScrollBar(){
        let height = global.$("#" + this.state.uuid).height();
        let parentHeight = global.$("#" + this.state.uuid).parent().height();
        this.setState({
            scrollbarNeeded: parentHeight < height
        });
    }

    componentWillReceiveProps() {
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
                scrollbarNeeded: parentHeight < height
            });
        }
    }

    render() {
        return <div className="draggable-container d-flex align-items-stretch h-100">
            <div id={this.state.uuid} className="draggable-content">
                {this.props.children}
            </div>
            <ScrollBar visible={this.state.scrollbarNeeded} percent={this.state.percent}/>
        </div>;
    }
}