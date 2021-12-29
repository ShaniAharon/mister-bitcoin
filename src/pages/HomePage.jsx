import {Component} from 'react';
import {MoveList} from '../cmps/MoveList';
import {bitcoinService} from '../services/bitcoinService';
import {userService} from '../services/userService';

export class HomePage extends Component {
  state = {
    user: userService.getUser(),
    rate: null,
    filterBy: null,
  };

  async componentDidMount() {
    console.log(this.state.user);
    this.loadRate();
  }

  async loadRate() {
    const {coins} = this.state.user;
    const rate = await bitcoinService.getRate(coins);
    console.log(rate);
    this.setState({rate: rate[coins]});
  }

  // onSelectedPage = (page) => {
  //   this.setState({page});
  // };

  rate = () => {
    bitcoinService.getRate(100);
    bitcoinService.getMarketPrice(5);
    bitcoinService.getConfirmedTransactions(5);
  };

  render() {
    const {rate, user} = this.state;
    if (!rate) return <div>Loading...</div>;
    if (!user) return <div>Loading...</div>;
    return (
      <div className="home-page">
        <div className="user-info">
          <h2> Hello! {user.name}</h2>
          <h3> Coins: {user.coins}</h3>
          <h3> BTC: {rate}</h3>
        </div>
        <MoveList title={'Your Last 3 Moves'} moveList={user.moves} />
      </div>
    );
  }
}
