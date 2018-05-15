import React, {Component} from 'react';
import waitersPageActions from "./WaitersPageActions";
import Page from "../Page";
import waitersPageStore from "./WaitersPageStore";
import WaiterEditor from "./WaiterEditor";
import WaitersNavigator from "./WaitersNavigator";
import {findByUuid} from "../../utils/Utils";
import NavPills from "../../widgets/NavPills";
import NavElement from "../../widgets/NavElement";
import NavElementLink from "../../widgets/NavElementLink";
import {CONFIGURATION} from "../../App";
import {EditorStatus} from "../StoresUtils";
import {WaitersCreatorActions} from "./WaitersCreatorActions";
import WaitersNav from "./WaitersNav";
import {WaitersEditorActions} from "./WaitersEditorActions";

const {Map} = require('immutable');

export default class WaitersPage extends Component {

    constructor(props) {
        super(props);
        this.state = waitersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        waitersPageStore.addChangeListener(this.updateState);

        waitersPageActions.initWaitersPage();
    }

    componentWillUnmount() {
        waitersPageStore.removeChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    render() {
        let pageContent = WaitersPage.makePageContent(this.state.data);
        return (
            <Page title="Camerieri">
                <WaitersNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorStatus = data.get('editorStatus');

        if (editorStatus === EditorStatus.EDITING) {
            return <WaiterEditor data={data} actionsProvider={WaitersEditorActions}/>
        } else if (editorStatus === EditorStatus.CREATING) {
            return <WaiterEditor data={data} actionsProvider={WaitersCreatorActions}/>
        } else {
            return <WaitersNavigator data={data}/>
        }
    }
}