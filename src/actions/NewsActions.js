import alt from '../alt';
import { AbstractPostActions } from './PostActions';

class NewsActions extends AbstractPostActions {
  constructor() {
    super('news');
  }
}

export default alt.createActions(NewsActions);
