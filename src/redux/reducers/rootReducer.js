import { combineReducers } from "redux";
import authReducer from "./authReducer";
import criminalEffectsReducer from "./CriminalEffectsReducer";
import receivingDeliveringSamplesReducer from "./ReceivingDeliveringSamplesReducer";
import TrafficEetectionReducer from "./TrafficEetectionReducer";
import StatisticsReducer from "./StatisticsReducer";
import LogReducer from "./LogReducer";

export default combineReducers({
  authReducer: authReducer,
  criminalEffectsReducer: criminalEffectsReducer,
  receivingDeliveringSamplesReducer: receivingDeliveringSamplesReducer,
  TrafficEetectionReducer: TrafficEetectionReducer,
  StatisticsReducer: StatisticsReducer,
  LogReducer: LogReducer,
});
