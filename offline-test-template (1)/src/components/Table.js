import React from "react";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

class StyledTable extends React.Component {

  getStyleColor(currentDate, vaccineDate) {

    var dt = moment(currentDate, dateFormat);
    var vcDt = moment(vaccineDate, dateFormat);

    if (vcDt.isSameOrBefore(dt)) {
      return "vaccinated";
    } else {
      return "pending";
    }
  }


  render() {
    const DisplayData = this.props.dataList.map(
      (info) => {
        return (
          <tr id={info.person_id} className={this.getStyleColor(
            this.props.currentDate, info.vaccination_date)}>
            <td>{info.person_id}</td>
            <td>{info.person_name}</td>
            <td>{info.vaccination_date}</td>
          </tr>
        )
      }
    )

    return (
      <table>
        <thead>
          <tr style={{ backgroundColor: "#737373", color: "white" }}>
            <th>Name</th>
            <th>Vaccination Date</th>
            <th>Vaccination Status</th>
          </tr>
        </thead>
        <tbody>
          {DisplayData}
        </tbody>
      </table>

    );
  }
}

export default StyledTable;