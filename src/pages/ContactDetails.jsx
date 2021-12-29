import {Component} from 'react';
import {MoveList} from '../cmps/MoveList';
import {TransferFund} from '../cmps/TransferFund';
import {contactService} from '../services/contactService';
import {userService} from '../services/userService';

export class ContactDetails extends Component {
  state = {
    contact: null,
    user: null,
  };

  componentDidMount() {
    this.loadContact();
  }

  async loadContact() {
    // console.log('this.props.contactId:', this.props.contactId);

    const contact = await contactService.getContactById(
      this.props.match.params.id
    );
    const user = userService.getUser();
    console.log('loadContact -> contact', contact);
    this.setState({contact, user});
  }

  onGoBack = () => {
    this.props.history.push('/contact');
  };

  render() {
    const {contact, user} = this.state;
    if (!contact) return <div>Loading..</div>;
    return (
      <div className="contact-details">
        <h1>{contact.name}</h1>
        <h3>{contact.phone}</h3>
        <h3>{contact.email}</h3>
        <img src={`https://robohash.org/${contact._id}`} alt="" />
        {/* <button onClick={this.onGoBack}>Back</button> */}
        <TransferFund contact={contact} />
        <MoveList
          contact={contact}
          title={'Your Moves'}
          moveList={user.moves}
        />
      </div>
    );
  }
}
