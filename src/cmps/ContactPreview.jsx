import {Link} from 'react-router-dom';
import {eventBusService} from '../services/eventBusService';

export function ContactPreview({contact, removeContact}) {
  function onRemoveContact(ev) {
    ev.stopPropagation();
    removeContact(contact._id);
    eventBusService.emit('delete', contact._id);
  }

  return (
    <article className="contact-preview">
      <section className="info">
        <Link to={`/contact/${contact._id}`} className="info">
          <img src={`https://robohash.org/${contact._id}`} alt="" />
          <h2>{contact.name}</h2>
        </Link>
      </section>
      <section className="actions">
        <Link to={`/contact/edit/${contact._id}`}>Edit Contact</Link>
        <button onClick={onRemoveContact}>X</button>
      </section>
    </article>
  );
}
