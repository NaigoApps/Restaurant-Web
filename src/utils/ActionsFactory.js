export default class ActionsFactory{
    static actionId = 0;

    static next(){
        return this.actionId++;
    }
}