export class Store {
    private subscribers: Function[];
    private reducers: {[key: string]: Function};
    private state: {[key: string]: any};

    constructor(reducers = {}, initialState = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState, {});
    }

    get value() {
        return this.state;
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        this.notify();
        return () => {
            this.subscribers = this.subscribers.filter(subscriber => subscriber != fn);
            console.log('Subscriber Length:::', this.subscribers.length);
        }
    }

    notify() {
        this.subscribers.forEach(fn => fn(this.value));
    }
    dispatch(action: any) {
        this.state = this.reduce(this.state, action);
        this.notify();
    }

    reduce(state, action) {
        const newState = {};
        for(let prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }
}