import { createGlobalState } from 'react-hooks-global-state';

interface Observer {
  id: number;
  observer: () => void;
}
class Subject {
  observers: Array<Observer> = [];
  index = 0;

  subscribe = (observer: () => {}) => {
    this.observers.push({ observer, id: this.index++ });
  };

  unsubscribe = (id: number) => {
    this.observers = this.observers.filter(({ id: itemId }) => id !== itemId);
  };

  notifyAll = () => {
    this.observers.forEach(({ observer }) => {
      observer();
    });
  };
}

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
  editLane: false,
  lanes: [],
  activeViews: {},
  activePatientViews: {},
  onCreateAppointment: new Subject(),
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
