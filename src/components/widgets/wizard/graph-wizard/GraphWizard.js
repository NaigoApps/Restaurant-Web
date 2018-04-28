import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import Button from "../../../../widgets/Button";
import GraphWizardPage from "./GraphWizardPage";
import Modal from "../../../../widgets/modal/Modal";
import {uuid} from "../../../../utils/Utils";
import NavPills from "../../../../widgets/NavPills";
import NavElement from "../../../../widgets/NavElement";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";

export default class GraphWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "gw_" + uuid(),
            data: [],
            refreshPulse: 0
        };

        this.updateWizard = this.updateWizard.bind(this);

    }

    cssUpdate() {
        this.setState(prevState => {
            return {
                refreshPulse: prevState.refreshPulse + 1
            }
        });
    }

    componentDidMount() {
        //FIXME
        // graphWizardStore.addChangeListener(this.updateWizard);
        if (this.props.visible) {
            this.openWizard();
        }
    }

    openWizard() {
        graphWizardActions.reset(this.state.uuid, this.initialWizardData(), this.props.initialPage);
        graphWizardActions.open(this.state.uuid);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.visible && this.props.visible) {
            this.openWizard();
        }
    }

    componentWillUnmount() {
        //FIXME
        // graphWizardStore.removeChangeListener(this.updateWizard);
    }

    initialWizardData() {
        let initialData = {};
        React.Children.forEach(this.props.children, child => {
            initialData[child.props.identifier] = GraphWizardPage.initializeWizard(child.props);
        });
        return initialData;
    }

    confirmAction() {
        this.props.commitAction(this.state.data);
        graphWizardActions.confirm(this.state.uuid);
    }

    abortAction() {
        graphWizardActions.abort(this.state.uuid);
        if (this.props.abortAction) {
            this.props.abortAction();
        }
    }

    updateWizard(state) {
        this.setState((prevState, props) => (state.get(prevState.uuid)));
    }

    pagesNumber() {
        return React.Children.count(this.props.children);
    }

    render() {
        if (!this.props.auto) {
            if (this.props.hideForm) {
                return <div className="form-horizontal">
                    {this.buildModal()}
                </div>;
            }
            return <Row align="center" topSpaced>
                <Column sm={this.props.labelSize || "4"} right>
                    <label><b>{this.props.label}</b></label>
                </Column>
                <Column auto={!this.props.buttonSize} sm={this.props.buttonSize || ""}>
                    <Button
                        commitAction={this.openWizard.bind(this)}
                        text={this.renderData()}
                        icon="pencil"
                    />
                </Column>
                {this.buildModal()}
            </Row>;
        }
        return this.buildModal();
    }

    renderData() {
        if (this.props.renderer) {
            return this.props.renderer(this.initialWizardData());
        }
        return "";
    }

    buildAbortButton() {
        return <Button
            text="Annulla"
            type="danger"
            commitAction={this.abortAction.bind(this)}/>;
    }

    buildConfirmButton() {
        return <Button
            text="Conferma"
            type="success"
            disabled={this.props.isValid && !this.props.isValid(this.state.data)}
            commitAction={this.confirmAction.bind(this)}/>;
    }

    buildModal() {

        const pageName = this.props.page;

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            wizardData: this.state.data,
            wizardId: this.state.uuid,
            refreshPulse: this.state.refreshPulse
        }));

        const currentPage = React.Children.toArray(pages).find(page => page.props.identifier === pageName);

        const final = currentPage && currentPage.props.final;

        let nav = React.Children.map(this.props.children, (child) => {
            return <NavElement
                text={child.props.name}
                active={pageName === child.props.identifier}
                commitAction={() => this.props.onMovePage(child.props.identifier)}
                disabled={child.props.canEnter ? !child.props.canEnter(this.state.data) : false}
            />;
        });

        let navContainer;
        if (nav && nav.length > 1) {
            navContainer = <div className="modal-header">
                <NavPills>
                    {nav}
                </NavPills>
            </div>;
        }

        let buttons;
        if (final) {
            buttons = <Row justify="center">
                {this.buildAbortButton()}{this.buildConfirmButton()}
            </Row>;
        }

        return <Modal visible={this.props.visible || this.state.open} lg={this.props.size === "lg"}
                      onModalShown={() => this.cssUpdate()}
                      onModalHidden={() => this.cssUpdate()}>
            {navContainer}
            <div className="modal-body d-flex">
                <Column>
                    {currentPage}
                </Column>
            </div>
            <div className="modal-footer">
                <Column>
                    {buttons}
                </Column>
            </div>
        </Modal>
    }
}