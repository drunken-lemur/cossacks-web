import {Events} from 'services';
import {Event} from 'stores/models';
import {applySnapshot, types} from 'mobx-state-tree';

const Statuses = {
  done: 'done',
  pending: 'pending',
  error: 'error',
};

const EventsStore = types.model('EventsStore', {
  status: types.maybeNull(
    types.enumeration(Object.keys(Statuses))
  ),
  data: types.maybeNull(Event),
}).views(self => ({
  get isFetched() {
    return self.status === Statuses.done;
  },
  get isPending() {
    return self.status === Statuses.pending;
  },
  get isError() {
    return self.status === Statuses.error;
  }
})).actions(self => ({
  setStatus(status) {
    self.status = status;

    return self;
  },
  setStatusPending() {
    self.setStatus(Statuses.pending);
    return self;
  },
  setStatusDone(response) {
    self.setStatus(Statuses.done);

    return response;
  },
  onError(error) {
    self.setStatus(Statuses.error);

    return Promise.reject(error);
  },
  resetData(response) {
    applySnapshot(self, {data: response});

    return self;
  },
  fetch(id) {
    self.setStatusPending();

    return Events.get(id)
      .then(self.resetData)
      .then(self.setStatusDone)
      .catch(self.onError);
  },
  create(data) {
    self.setStatusPending();

    return Events.create(data)
      .then(self.resetData)
      .then(self.setStatusDone)
      .catch(self.onError);
  },
  update(id, data) {
    self.setStatusPending();

    return Events.patch(id, data)
      .then(self.resetData)
      .then(self.setStatusDone)
      .catch(self.onError);
  }
}));

export default EventsStore;
