import React from 'react';
import {uuid} from "../../utils/Utils";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

export default class PopupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid(),
            height: 0
        }
    }

    componentDidMount() {
        this.centerContent();
        if (this.props.visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.visible && !this.props.visible) {
            this.hide();
        } else if (!prevProps.visible && this.props.visible) {
            this.show();
        }
    }

    centerContent() {
        let container = global.$("#p-container-" + this.state.uuid);
        let content = global.$("#p-content-" + this.state.uuid);
        let containerWidth = container.width();
        let contentWidth = content.width();
        content.offset({
            left: (containerWidth - contentWidth) / 2
        });
    }

    hide() {
        let container = global.$("#p-container-" + this.state.uuid);
        let content = global.$("#p-content-" + this.state.uuid);
        let contentHeight = content.outerHeight();
        content.animate({
            bottom: -contentHeight
        });
        container.animate({
            backgroundColor: 'rgba(255,255,255,0)'
        }, {
            complete: () => container.css({visibility: "hidden"})
        });
    }

    show() {
        this.centerContent();
        let container = global.$("#p-container-" + this.state.uuid);
        let content = global.$("#p-content-" + this.state.uuid);
        container.css({visibility: "visible"});
        container.animate({
            backgroundColor: 'rgba(255,255,255,0.8)'
        });
        content.animate({
            bottom: 0
        });
    }

    containerClass() {
        let classes = ["popup-container"];
        if (this.props.visible) {
            classes.push("visible");
        }
        return classes.join(" ");
    }

    render() {
        return <div id={"p-container-" + this.state.uuid} className={this.containerClass()}>
            <div id={"p-content-" + this.state.uuid} className="popup-content-container">
                <Row>
                    <Column>
                        {this.props.children}
                    </Column>
                </Row>
            </div>
        </div>
    }

}