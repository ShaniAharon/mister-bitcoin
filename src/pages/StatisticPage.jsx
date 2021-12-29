import {Component} from 'react';
import {Chart} from '../cmps/Chart';
import {ChartTrans} from '../cmps/ChartTrans';

export class StatisticPage extends Component {
  state = {
    contact: null,
  };

  render() {
    return (
      <div className="stat-page">
        <Chart />
        <br />
        <br />
        <ChartTrans />
      </div>
    );
  }
}
