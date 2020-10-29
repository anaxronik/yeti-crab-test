import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = ({ isAuthenticated }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  if (isAuthenticated) {
    return (
      <nav>
        <div className="nav-wrapper deep-purple lighten-4">
          <NavLink to="/orders" className="center">
            <span className="brand-logo">Список заявок</span>
          </NavLink>
          <ul id="nav-mobile" className="right ">
            <li>
              <NavLink to="/create">Создать заявку</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Заявки</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  } else {
    return (
      <nav>
        <div className="nav-wrapper deep-purple lighten-4">
          <span className="brand-logo">Список заявок</span>
          <ul id="nav-mobile" className="right ">
            <li>
              <NavLink to="/create">Создать заявку</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Заявки</NavLink>
            </li>
            <li>
              <NavLink to="/login">Войти</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
