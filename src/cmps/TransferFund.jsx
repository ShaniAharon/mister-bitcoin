import {Link} from 'react-router-dom';
import {eventBusService} from '../services/eventBusService';
import {Component} from 'react';
import {userService} from '../services/userService';

export class TransferFund extends Component {
  // function onRemoveContact(ev) {
  //   ev.stopPropagation();
  //   removeContact(contact._id);
  //   eventBusService.emit('delete', contact._id);
  // }

  state = {
    amount: null,
  };

  handleChange = ({target}) => {
    console.log(target.value);
    this.setState({amount: +target.value});
  };

  onTransferCoins = () => {
    const {contact} = this.props;
    const user = userService.addMove(contact, this.state.amount); // need to immutate?
    console.log('after transfer', user);
  };

  render() {
    const {contact} = this.props;
    return (
      <article className="transfer">
        <section className="info">
          <h2>Transfer Coins To {contact.name}</h2>
          <div>
            Amount <input type="number" onChange={this.handleChange} />
            <button onClick={this.onTransferCoins}>Transfer</button>
          </div>
        </section>
      </article>
    );
  }
}
