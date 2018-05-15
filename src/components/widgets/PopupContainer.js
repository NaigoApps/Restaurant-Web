import React from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

export default class PopupContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.centerContent();
        //Init background for bug
        let container = global.$("#p-container-" + this.props.id);
        container.css({backgroundColor: 'rgba(255,255,255,0)'});

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
        let container = global.$("#p-container-" + this.props.id);
        let content = global.$("#p-content-" + this.props.id);
        let containerWidth = container.width();
        let contentWidth = content.width();
        content.offset({
            left: (containerWidth - contentWidth) / 2
        });
    }

    hide() {
        let container = global.$("#p-container-" + this.props.id);
        let content = global.$("#p-content-" + this.props.id);
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
        let container = global.$("#p-container-" + this.props.id);
        let content = global.$("#p-content-" + this.props.id);

        let windowHeight = global.$(window).height();
        let contentHeight = content.height();

        container.css({visibility: "visible"});
        container.animate({
            backgroundColor: 'rgba(255,255,255,0.8)'
        });
        content.animate({
            bottom: (windowHeight - contentHeight) / 2
        });
    }

    containerClass() {
        let classes = ["popup-container"];
        if (this.props.visible) {
            classes.push("visible");
        }
        return classes.join(" ");
    }

    mayClose(evt) {
        if (evt.target.id === "p-container-" + this.props.id && this.props.blurCallback) {
            this.props.blurCallback();
        }
    }

    render() {
        return <div
            id={"p-container-" + this.props.id}
            className={this.containerClass()}
            onClick={(evt) => this.mayClose(evt)}>
            <div id={"p-content-" + this.props.id} className="popup-content-container">
                <Row>
                    <Column>
                        {this.props.children}
                    </Column>
                </Row>
            </div>
        </div>
    }

}