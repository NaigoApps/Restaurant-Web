import React, {Component} from 'react';
import {findByUuid, iGet} from "../../utils/Utils";
import NavElement from "../../widgets/NavElement";
import printersEditorActions from "./PrintersEditorActions";
import NavPills from "../../widgets/NavPills";
import NavElementLink from "../../widgets/NavElementLink";
import {SETTINGS} from "../../App";
import {EditorStatus} from "../StoresUtils";

export default class PrintersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = this.makeNavContent();
        return <NavPills>{navContent}</NavPills>;
    }

    makeNavContent() {
        let data = this.props.data;
        let elements = [];
        let status = data.get('status');
        let printer = data.get('printer');
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            page={SETTINGS}
        />);
        elements.push(<NavElement
            key="printers"
            text="Stampanti"
            active={status === EditorStatus.SURFING}
            commitAction={() => printersEditorActions.deselectPrinter()}
        />);
        if (status === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={iGet(data, "editor.name.value")}
                active={true}
            />);
        } else if (status === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={iGet(data, "editor.name.value")}
                active={true}
            />);
        }
        return elements;
    }
}