import React, {Component} from 'react';
import {ApplicationActions} from "../actions/ApplicationActions";
import Button from "../widgets/Button";
import {HOME, Pages, SETTINGS} from "../App";
import NavPills from "../widgets/NavPills";
import Column from "../widgets/Column";
import Row from "../widgets/Row";

export const SIZES = {
    HIDDEN: "HIDDEN",
    SMALL: "SMALL",
    MAIN: "MAIN"
};

class RestaurantNav extends Component {

    constructor() {
        super();
    }

    goHome() {
        ApplicationActions.dismissFullScreen();
        ApplicationActions.goToPage(Pages.HOME)
    }

    render() {

        return (
            <NavPills>
                <Column>
                    <Row justify="center">
                        <Column>
                            <Row>
                                <Column auto>
                                    <Button
                                        icon="home"
                                        commitAction={() => this.goHome()}
                                        highPadding
                                    />
                                </Column>
                                {this.props.children}
                            </Row>
                        </Column>
                        <Column auto>
                            <Button
                                icon="gears"
                                commitAction={() => ApplicationActions.goToPage(Pages.SETTINGS)}
                                highPadding
                            />
                        </Column>
                        <Column auto>
                            <Button
                                icon="window-restore"
                                commitAction={() => ApplicationActions.toggleFullScreen()}
                                highPadding
                            />
                        </Column>
                    </Row>
                </Column>
            </NavPills>
        );
    }
}

export default RestaurantNav;