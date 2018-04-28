import React from 'react';
import {uuid} from "../../../../utils/Utils";

export default class GroupEditorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid()
        }
    }

    componentDidMount() {
        let thisComp = global.$("#" + this.state.uuid);
        let parentComp = thisComp.parent();
        let parentLeft = parentComp.offset().left;
        let parentTop = parentComp.offset().top;
        let parentWidth = parentComp.outerWidth();
        global.$("#" + this.state.uuid).offset({
            top: parentTop,
            left: parentLeft + parentWidth
        });
    }

    render() {
        return <div id={this.state.uuid} className="my-tooltip">
            {this.props.children}
        </div>
    }

}