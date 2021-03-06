import React, {Component} from 'react';
import Button from "../../../../widgets/Button";
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

    confirmAction() {
        this.props.commitAction(this.state);
    }

    abortAction() {
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
        const pageName = this.props.page;

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            wizardData: this.state,
            wizardId: this.state.uuid,
            refreshPulse: this.state.refreshPulse
        }));

        const currentPage = React.Children.toArray(pages).find(page => page.props.identifier === pageName);

        let nav = React.Children.map(this.props.children, (child) => {
            return <NavElement
                text={child.props.name}
                active={pageName === child.props.identifier}
                commitAction={() => this.props.onMovePage(child.props.identifier)}
                disabled={child.props.canEnter ? !child.props.canEnter(this.state) : false}
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

        let buttons = <Row justify="center">
            <Column>
                {this.buildAbortButton()}
            </Column>
            <Column>
                {this.buildConfirmButton()}
            </Column>
        </Row>;

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

    buildAbortButton() {
        return <Button
            text={this.props.abortText || "Annulla"}
            type="danger"
            commitAction={this.abortAction.bind(this)}/>;
    }

    buildConfirmButton() {
        return <Button
            text={this.props.confirmText || "Conferma"}
            type="success"
            disabled={this.props.isValid !== undefined && !this.props.isValid}
            commitAction={this.confirmAction.bind(this)}/>;
    }

}