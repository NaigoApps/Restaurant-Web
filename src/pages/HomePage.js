import React, {Component} from 'react';
import Page from "./Page";
import RestaurantHomeNav from "../components/RestaurantHomeNav";

class HomePage extends Component {
    render() {
        return (
            <Page title="Home">
                <RestaurantHomeNav/>
            </Page>
        );
    }
}

export default HomePage;
