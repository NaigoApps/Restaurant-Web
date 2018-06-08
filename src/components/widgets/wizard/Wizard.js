import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import Modal from "../../../widgets/modal/Modal";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";

const {Map} = require('immutable');

export default class Wizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshPulse: 0
        };

    }

    cssUpdate() {
        this.setState(prevState => {
            return {
                refreshPulse: prevState.refreshPulse + 1
            }
        });
    }

    abort() {
        if (this.props.abortAction) {
            this.props.abortAction();
        }
    }

    confirm() {
        if (this.props.confirmAction) {
            this.props.confirmAction(this.pagesNumber());
        }
    }

    backward() {
        if (this.props.backwardAction) {
            this.props.backwardAction();
        }
    }

    forward() {
        if (this.props.forwardAction) {
            this.props.forwardAction(this.pagesNumber());
        }
    }

    pagesNumber() {
        return React.Children.count(this.props.children);
    }

    render() {
        const currentPage = this.getCurrentPage();

        let header = <div/>;
        if (currentPage && currentPage.props.title) {
            header = <div className="modal-header">
                <h5 className="modal-title">{currentPage.props.title}</h5>
            </div>;
        }

        return <Modal visible={this.props.visible}
                      lg={this.props.size === "lg"}
                      onModalShown={() => this.cssUpdate()}
                      onModalHidden={() => this.cssUpdate()}>
            {header}
            <div className="modal-body d-flex">
                <Column>
                    {currentPage}
                </Column>
            </div>
            <div className="modal-footer">
                <Column>
                    <Row justify="space-between">
                        {this.buildBackwardButton()}
                        <Column>
                            <Row justify="center">
                                {this.buildAbortButton()}
                            </Row>
                        </Column>
                        {this.buildForwardButton()}
                    </Row>
                </Column>
            </div>
        </Modal>
    }

    canMoveBackward() {
        return this.props.currentPage > 0;
    }

    buildBackwardButton() {
        return <Button
            text="Indietro"
            commitAction={() => this.backward()}
            type={this.canMoveBackward() ? "info" : "secondary"}
            disabled={!this.canMoveBackward()}
        />;
    }


    canMoveForward() {
        const currentPage = this.getCurrentPage();
        return currentPage && currentPage.props.isValid
            && this.props.currentPage + 1 < this.pagesNumber();
    }

    buildForwardButton() {
        if (this.isLastPage()) {
            return this.buildConfirmButton();
        }
        return <Button
            text="Avanti"
            type={this.canMoveForward() ? "info" : "secondary"}
            disabled={!this.canMoveForward()}
            commitAction={() => this.forward()}
        />;
    }

    buildConfirmButton() {
        return <Button
            text="Conferma"
            type={this.canConfirmWizard() ? "success" : "secondary"}
            disabled={!this.canConfirmWizard()}
            commitAction={() => this.confirm()}
        />;
    }

    buildAbortButton() {
        return <Button
            text="Annulla"
            type="danger"
            commitAction={() => this.abort()}
        />;
    }

    canConfirmWizard() {
        const currentPage = this.getCurrentPage();
        return this.props.currentPage === this.pagesNumber() - 1 && currentPage.props.isValid;
    }

    isLastPage() {
        return this.props.currentPage === this.pagesNumber() - 1;
    }

    getCurrentPage() {
        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            refreshPulse: this.state.refreshPulse
        }));
        return React.Children.toArray(pages)[this.props.currentPage];
    }

}