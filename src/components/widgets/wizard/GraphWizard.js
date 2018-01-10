import React, {Component} from 'react';
import graphWizardStore from "./GraphWizardStore";
import graphWizardActions from "./GraphWizardActions";
import Button from "../../../widgets/Button";
import GraphWizardPage from "./graph/GraphWizardPage";
import Modal from "../../../widgets/modal/Modal";
import {uuid} from "../../../utils/Utils";
import NavPills from "../../../widgets/NavPills";
import NavElement from "../../../widgets/NavElement";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";

export default class GraphWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "gw_" + uuid(),
            data: []
        };

        this.updateWizard = this.updateWizard.bind(this);

    }

    componentDidMount() {
        graphWizardStore.addChangeListener(this.updateWizard);
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
        graphWizardStore.removeChangeListener(this.updateWizard);
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

    movePage(pageProps) {
        graphWizardActions.movePage(this.state.uuid, pageProps.identifier);
        if (pageProps.onEnter) {
            pageProps.onEnter(this.state.uuid, this.state.data);
        }
    }

    pagesNumber() {
        return React.Children.count(this.props.children);
    }

    render() {
        if (this.props.isForNav) {
            return this.buildNavContent();
        } else {
            return this.buildDefaultContent();
        }
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

    buildNavContent() {
        return <div className="form-group">
            <Button
                commitAction={this.openWizard.bind(this)}
                text={this.props.label + " " + this.renderData()}
                icon="pencil"
            />
            {this.buildModal()}
        </div>;
    }

    buildDefaultContent() {
        if (this.props.hideForm) {
            return <div className="form-horizontal">
                {this.buildModal()}
            </div>;
        }
        return <div className="form-group row">
            <label className="col-form-label col-sm-2">{this.props.label}</label>
            <div className="col-sm-10">
                <Button
                    commitAction={this.openWizard.bind(this)}
                    text={this.renderData()}
                    icon="pencil"
                />
            </div>
            {this.buildModal()}
        </div>;
    }


    buildModal() {

        const pageName = this.state.page;

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            wizardData: this.state.data,
            wizardId: this.state.uuid
        }));

        const currentPage = React.Children.toArray(pages).find(page => page.props.identifier === pageName);

        let value = this.props.renderer(this.state.data);
        let review;
        if (value && !this.props.hideReview) {
            review = <div className="well well-sm text-left">
                {value}
            </div>
        }

        let nav = React.Children.map(this.props.children, (child) => {
            return <NavElement
                text={child.props.name}
                active={this.state.page === child.props.identifier}
                commitAction={this.movePage.bind(this, child.props)}
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

        return <Modal visible={this.props.visible || this.state.open} lg={this.props.size === "lg"}>
            {navContainer}
            <div className="modal-body d-flex">
                <Column>
                    {currentPage}
                </Column>
            </div>
            <div className="modal-footer">
                <Column>
                    <Row>
                        {review}
                    </Row>
                    <Row justify="center">
                        {this.buildAbortButton()}{this.buildConfirmButton()}
                    </Row>
                </Column>
            </div>
        </Modal>
    }
}