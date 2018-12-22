import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import PopupContainer from "../PopupContainer";

export default class Wizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshPulse: 0
        };

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
            header = <Row>
                <Column>
                    <h5>{currentPage.props.title}</h5>
                </Column>
            </Row>;
        }

        return <PopupContainer
            id={this.props.id}
            visible={this.props.visible}
            size={this.props.size}>
            {header}
            <Row grow>
                <Column>
                    {currentPage}
                </Column>
            </Row>
            <Row>
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
            </Row>
        </PopupContainer>
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