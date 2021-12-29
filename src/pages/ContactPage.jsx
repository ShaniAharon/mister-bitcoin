import {Component} from 'react';
import {ContactFilter} from '../cmps/ContactFilter';
import {ContactList} from '../cmps/ContactList';
import {bitcoinService} from '../services/bitcoinService';
import {contactService} from '../services/contactService';
import {ContactDetails} from './ContactDetails';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions';

class _ContactPage extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    filterBy: null,
  };

  componentDidMount() {
    this.props.loadContacts();
  }

  // async loadContacts() {
  //   const {filterBy} = this.state;
  //   const contacts = await contactService.getContacts(filterBy);
  //   console.log(contacts);
  //   this.setState({contacts});
  // }

  onSelectContact = (contactId) => {
    this.setState({selectedContactId: contactId});
  };

  onChangeFilter = (filterBy) => {
    // this.setState({filterBy}, this.loadContacts);
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
    // this.loadContacts()
  };

  rate = () => {
    bitcoinService.getRate(100);
    bitcoinService.getMarketPrice(5);
    bitcoinService.getConfirmedTransactions(5);
  };

  removeContact = (contactId) => {
    // await contactService.deleteContact(contactId);
    // this.loadContacts();
    this.props.removeContact(contactId);
  };

  render() {
    const {contacts} = this.props;
    const {selectedContactId} = this.state;
    if (!contacts) return <div>Loading...</div>;
    return (
      <div className="contact-app container contact-page">
        <ContactFilter onChangeFilter={this.onChangeFilter} />
        <Link to="/contact/edit" className="plus-btn">
          <i className="fas fa-plus-square"></i>
        </Link>
        {selectedContactId ? (
          <ContactDetails
            goBack={() => this.onSelectContact(null)}
            contactId={selectedContactId}
          />
        ) : (
          <ContactList removeContact={this.removeContact} contacts={contacts} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
};

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
