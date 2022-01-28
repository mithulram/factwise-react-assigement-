{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import axios from "axios";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import { AppContextProvider, Context } from "./Context.js"
import React from "react";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";
const baseDateURL = "http://localhost:3000/data/current_date.json";
const vaccineDetailsURL = "http://localhost:3000/data/vaccine_dates.json";

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      var dt = moment(state.currentDate, dateFormat);
      dt = dt.add(1, 'day');
      getCount(state, dt, state.personInfo);
      return { ...state, currentDate: dt.format(dateFormat) };
    case 'decrement':
      console.log("decrease is called");
      var dt = moment(state.currentDate, dateFormat);
      dt = dt.subtract(1, 'day');
      getCount(state, dt, state.personInfo);
      return { ...state, currentDate: dt.format(dateFormat) };
    case 'updateDate':
      console.log("updating the date" + action.value);
      return { ...state, currentDate: action.value };
    case 'updatePersonInfo':
      console.log('updating person details...');
      getCount(state, moment(state.currentDate, dateFormat), action.value);
      return { ...state, personInfo: action.value };
    default:
      console.log('default action is set to return error. it can also return existing state.');
      throw new Error();
  }
};

function getCount(state, date, personInfo) {
  console.log("calling get count..")

  let dataJson = personInfo;
  let temp = 0;
  let currentDt = date;

  for (let i = 0; i < dataJson.length; i++) {
    // console.log(dataJson[i].vaccination_date);
    let dt = moment(dataJson[i].vaccination_date, dateFormat);

    if (dt.isSameOrBefore(currentDt)) {
      temp += 1;      
    }
  }

  state.totalCount = dataJson.length;
  state.vaccineCount = temp;
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    currentDate: '',
    personInfo: [],
    vaccineCount: 0,
    totalCount: 0
  });

  React.useEffect(() => {

    //use async & await to make sure the first call gets over and then only next runs
    (async () => {
      await axios.get(baseDateURL).then((response) => {      
        dispatch({ type: 'updateDate', value: response.data.current_date });        
      });
    })();

    axios.get(vaccineDetailsURL).then((response) => {
      //console.log(response.data);

      if (response.data) {
        //sort the data as the person id - 99, is somehwere in the middle of json object
        response.data.sort((a, b) => parseFloat(a.person_id) - parseFloat(b.person_id));
        dispatch({ type: 'updatePersonInfo', value: response.data });
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="AppHeader">
        <h1 className="AppTitle">Test Challenge - Vaccine Dashboard</h1>
      </header>
      <div className="Container">
        <div className="LeftApp">
          <div className="LeftContainerApp">
            <div className="chart">
              <AppContextProvider>
                <PieChart data={[state.vaccineCount, state.totalCount - state.vaccineCount]} />
              </AppContextProvider>
            </div>
            <div className="buttons">
              <Buttons parentState={state.currentDate} dispatch={dispatch} />
            </div>
            <b style={{ textAlign: "center" }}>
              {state.vaccineCount} out of {state.totalCount} persons have been vaccinated.
          </b>
          </div>
        </div>
        <div className="RightApp">
          <div className="table">
            <StyledTable dataList={state.personInfo} currentDate={state.currentDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
