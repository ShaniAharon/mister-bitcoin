import {bitcoinService} from '../services/bitcoinService';
import {Component} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// export function Chart({contacts, onSelectContact}) {
//   return (
//     <section className="robot-list simple-cards-grid">
//       <h1>Market Price (USD)</h1>

//     </section>
//   );
// }

export class ChartTrans extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const data = await bitcoinService.getConfirmedTransactions(5);
    console.log('loadData -> data', data[5].values);
    const prices = data[5].values.map((value) => {
      return {
        x: parseInt(new Date(value.x).toTimeString().substring(3, 6)),
        y: value.y,
      };
    });
    console.log(prices);
    this.setState({data: prices});
  }

  render() {
    const {data} = this.state;
    if (!data) return <div>Loading...</div>;
    const test = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
    ];
    const renderLineChart = (
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="time"
          stroke="#8884d8"
          activeDot={{r: 8}}
        />
        <Line type="monotone" dataKey="x" stroke="#82ca9d" />
      </LineChart>
    );
    return (
      <section>
        <h1>Confirmed Transactions</h1>
        {renderLineChart}
      </section>
    );
  }
}
