import {ContactPreview} from './ContactPreview';

export function ContactList({contacts, removeContact}) {
  return (
    <section className="contact-list simple-cards-grid">
      {contacts.map((contact) => (
        <ContactPreview
          contact={contact}
          removeContact={removeContact}
          key={contact._id}
        />
      ))}
    </section>
  );
}
