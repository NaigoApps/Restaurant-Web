import dispatcher from "../dispatcher/SimpleDispatcher";

class RequestBuilder {

    constructor() {
        this.BASE_URL = "http://localhost:8080/restaurant/rest/";
    }

    buildParams(params) {
        var url = "?";
        var sep = "";
        Object.keys(params).forEach(function (prop) {
            url += sep + prop + "=" + params[prop];
            sep = "&";
        });
        return url;
    }

    get(action, resource, params) {
        if (params) {
            resource += this.buildParams(params);
        }

        dispatcher.fireStart(action);

        return new Promise((resolve, reject) => {
            fetch(this.BASE_URL + resource, {
                method: "GET",
                mode: 'cors'
            }).then((response) => {
                if (response.ok) {
                    response.json().then((result) => {
                        dispatcher.fireEnd(action, result);
                        resolve(result);
                    });
                } else {
                    response.text().then((message) => {
                        dispatcher.fireError(action, message);
                        reject();
                    });
                }
            }).catch((error) => {
                dispatcher.fireFailure(action, error);
                reject();
            });
        })
    }

    post(action, resource, target) {
        dispatcher.fireStart(action);

        return new Promise((resolve, reject) => {
            fetch(
                this.BASE_URL + resource,
                {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: typeof(target) === "string" ? target : JSON.stringify(target)
                }
            ).then((response) => {
                if (response.ok) {
                    response.json().then((result) => {
                        dispatcher.fireEnd(action, result);
                        resolve(result.uuid);
                    });
                } else {
                    response.text().then((message) => {
                        dispatcher.fireError(action, message);
                        reject();
                    });
                }
            }).catch((error) => {
                dispatcher.fireFailure(action, error);
                reject();
            });
        })
    }

    put(action, resource, target) {
        dispatcher.fireStart(action);
        return fetch(this.BASE_URL + resource, {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: typeof(target) === "string" ? target : JSON.stringify(target)
        }).then((response) => {
            if (response.ok) {
                response.json().then((result) => dispatcher.fireEnd(action, result));
            } else {
                response.text().then((message) => {
                    dispatcher.fireError(action, message);
                });
            }
        }).catch((error) => {
            dispatcher.fireFailure(action, error);
        });
    }

    remove(action, resource, object) {
        dispatcher.fireStart(action);
        return fetch(this.BASE_URL + resource, {
            method: "DELETE",
            mode: 'cors',
            body: object
        }).then((response) => {
            if (response.ok) {
                dispatcher.fireEnd(action, object);
            } else {
                response.text().then((message) => {
                    dispatcher.fireError(action, message);
                });
            }
        }).catch((error) => {
            dispatcher.fireFailure(action, error);
        });
    }
}

const asyncActionBuilder = new RequestBuilder;

export default asyncActionBuilder;