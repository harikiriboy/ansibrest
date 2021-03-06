import {ReduceStore} from "flux/utils";
import dispatcher from "../dispatcher";
import Const from "../const";

class PlaybookStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.FETCH_PLAYBOOKS:
      return action.playbooks;
    case Const.FETCH_PLAYBOOK:
      return state.map((playbook)=>{
        if(playbook.name === action.playbook.name){
          playbook.plays = action.playbook.plays || [];
          return playbook;
        }
        return playbook;
      });
    case Const.PLAY_START_PLAYBOOK:
      return state.map((playbook)=>{
        if(playbook.name !== action.playbook.name) return playbook;
        playbook.results = [];
        return playbook;
      });
    case Const.PLAY_FINISH_PLAYBOOK:
      return state.map((playbook)=>{
        if(playbook.name !== action.playbook.name) return playbook;
        playbook.results = action.result.stdout.split("\n");
        return playbook;
      });
    case Const.PLAY_PROGRESS_PLAYBOOK:
      return state.map((playbook)=>{
        if(playbook.name !== action.playbook) return playbook;
        playbook.results.push(action.message);
        return playbook;
      });
    default:
      return state;
    }
  }
};
const playbookStore = new PlaybookStore(dispatcher);

export default playbookStore;
