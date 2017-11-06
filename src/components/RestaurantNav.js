import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const links = [
    {path: "", replace: true, label: "Home"},
    {path: "printers", label: "Stampanti"},
    {path: "locations", label: "Postazioni"},
    {path: "tables", label: "Tavoli"},
    {path: "waiters", label: "Camerieri"},
    {path: "additions", label: "Varianti"},
    {path: "menu", label: "Menu"},
    {path: "evening", label: "Serate"},
];

class RestaurantNav extends Component {

    constructor(){
        super();
        this.state = {
            clicked: null
        }
    }

    clickLink(link) {
        this.setState({clicked: link});
    }

    render() {
        let linksComponents = links.map(link =>
            (<li key={link.path}>
                <Link to={"/" + link.path} replace={link.replace ? true : false} onClick={this.clickLink.bind(this, link)}>
                    {this.state.clicked === link ? <strong className="text-primary">{link.label}</strong> : link.label}
                </Link>
            </li>));

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {linksComponents}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default RestaurantNav;