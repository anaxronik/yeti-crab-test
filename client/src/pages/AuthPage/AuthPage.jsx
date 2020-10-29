import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'

export const AuthPage = () => {
  const initialFormState = { email: '', password: '' }
  const [form, setForm] = useState(initialFormState)
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    console.log('login handler')
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (error) {
      console.log('Error in login handler')
    }
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      if (data.status === 'ok') {
        await loginHandler()
      }
      console.log('data:', data)
    } catch (error) {
      console.log('Error in register handler')
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card deep-purple lighten-4">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div className="input-field ">
              <input
                id="email"
                name="email"
                type="text"
                className="validate"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email" className="black-text">
                email
              </label>
            </div>
            <div className="input-field ">
              <input
                id="password"
                name="password"
                type="password"
                className="validate"
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor="password" className="black-text">
                Пароль
              </label>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
