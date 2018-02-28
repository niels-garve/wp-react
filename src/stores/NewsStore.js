import alt from '../alt';
import NewsActions from '../actions/NewsActions';
import AbstractPostStore from './AbstractPostStore';

class NewsStore extends AbstractPostStore {
  constructor() {
    super();

    this.bindActions(NewsActions);
  }
}

export default alt.createStore(NewsStore, 'NewsStore');
