import waitersActions from "../../generic/WaitersActions";

class WaitersPageActions {

    initWaitersPage(){
        waitersActions.retrieveWaiters();
        waitersActions.retrieveWaiterStatuses();
    }

    registerSocket() {
        let socket = new WebSocket('ws://localhost:8080/restaurant/notifications')
        socket.onopen = function (event) {
            console.info("Connection opened");
        };
        socket.onmessage = function (event) {
            console.info("Message: " + event.data);
        };
        socket.onclose = function () {
            console.info("Connection closed");
        }
    }
}

const waitersPageActions = new WaitersPageActions();
export default waitersPageActions;