import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const [form, setForm] = useState({ number: 1 })
  const { request } = useHttp()
  const history = useHistory()

  const firmNameRef = useRef()

  const fetchOrderNumber = useCallback(async () => {
    try {
      const data = await request('/api/order/', 'GET')
      const number = data[data.length - 1].number || 0
      setForm({ number: number + 1 })
    } catch (error) {
      console.log('Error in getOrderNumber')
    }
  }, [request])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async () => {
    try {
      await request('/api/order/create', 'POST', { ...form })
      history.push(`/orders/`)
    } catch (error) {
      console.log('Error in createHandler')
    }
  }

  useEffect(() => {
    fetchOrderNumber()
    firmNameRef.current.focus()
  }, [fetchOrderNumber])

  return (
    <div>
      <h1>Создание новой заявки № {form.number}</h1>
      <div>
        <div className="input-field ">
          <p className="black-text">Название фирмы заказчика</p>
          <input
            id="firmName"
            name="firmName"
            type="text"
            placeholder="Название фирмы заказчика"
            ref={firmNameRef}
            className="validate"
            value={form.firmName}
            onChange={changeHandler}
          />
        </div>
        <div className="input-field ">
          <p className="black-text">ФИО заказчика</p>
          <input
            id="name"
            name="name"
            type="text"
            className="validate"
            value={form.name}
            onChange={changeHandler}
          />
        </div>
        <div className="input-field ">
          <p className="black-text">Номер телефона</p>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className="validate"
            value={form.phoneNumber}
            onChange={changeHandler}
          />
        </div>
        <div className="input-field ">
          <p className="black-text">Коментарии</p>
          <textarea
            id="comment"
            name="comment"
            type="text"
            className="materialize-textarea"
            value={form.comment}
            onChange={changeHandler}
          />
        </div>
        <div className="input-field ">
          <p className="black-text">ati код</p>
          <input
            id="atiCode"
            name="atiCode"
            type="text"
            className="validate"
            value={form.atiCode}
            onChange={changeHandler}
          />
        </div>
      </div>
      <button className="btn" onClick={createHandler}>
        Создать
      </button>
    </div>
  )
}
