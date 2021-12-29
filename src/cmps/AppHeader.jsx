import {NavLink, withRouter} from 'react-router-dom';

export function _AppHeader({onSelectedPage}) {
  return (
    <header className="app-header">
      <section className="container nav">
        <h1 className="logo">Mister Bitcoin</h1>
        <div className="links">
          <NavLink className="link" activeClassName="my-active" exact to="/">
            Home
          </NavLink>
          <NavLink className="link" activeClassName="my-active" to="/contact">
            Contact
          </NavLink>
          <NavLink className="link" activeClassName="my-active" to="/statistic">
            Statistic
          </NavLink>
          <NavLink className="link" activeClassName="my-active" to="/signup">
            Signup
          </NavLink>
        </div>
      </section>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
