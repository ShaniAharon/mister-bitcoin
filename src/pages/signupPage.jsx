import {Component, createRef} from 'react';
import {contactService} from '../services/contactService';
import {userService} from '../services/userService';

export class signupPage extends Component {
  state = {
    user: null,
  };

  componentDidMount() {}
  inputRef = createRef(); //try this
  async loadContact() {
    const contact = await contactService.getContactById(
      this.props.match.params.id
    );
    console.log('loadContact -> contact', contact);
    this.setState({contact});
  }

  handleChange = ({target}) => {
    console.log(target.value);
    const userName = target.value;
    this.setState({userName});
  };

  onSignup = (ev) => {
    ev.preventDefault();
    const user = userService.signup(this.state.userName); //check it
    console.log(user);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="signup-page">
        <h1>Sign Up</h1>
        <p>Please enter your name</p>

        <input
          // ref={this.inputRef}
          onChange={this.handleChange}
          // value={contact.name}
          type="text"
          name="name"
        />
        <button onClick={this.onSignup}>Sign up</button>
      </div>
    );
  }
}
