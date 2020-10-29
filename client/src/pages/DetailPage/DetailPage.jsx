import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const isAuthenticated = !!token
  const [order, setOrder] = useState({ number: 0 })
  const { request } = useHttp()
  const id = useParams().id
  const [isUpdated, setIsUpdated] = useState(false)
  const history = useHistory()

  const fetchOrder = useCallback(async () => {
    try {
      const data = await request(`/api/order/${id}`, 'GET')
      setOrder(data)
    } catch (error) {
      console.log('Error in fetchOrder')
    }
    setIsUpdated(false)
  }, [id, request])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const changeHandler = (event) => {
    setIsUpdated(true)
    console.log('Change handler')
    setOrder({ ...order, [event.target.name]: event.target.value })
  }

  const fetchUpdateOrder = async (params) => {
    console.log('fetchUpdateOrder')
    try {
      await request(`/api/order/edit/${id}`, 'POST', { ...order })
    } catch (error) {
      console.log('Error in fetchUpdateOrder')
    }
    setIsUpdated(false)
    history.push('/orders/')
  }

  const deleteHandler = async () => {
    try {
      await request(`/api/order/delete/${id}`, 'DELETE')
    } catch (error) {
      console.log('Error in deleteHandler')
    }
    history.push('/orders/')
  }

  return (
    <div>
      {!isAuthenticated ? (
        <h5>Необходимо войти в систему для вненсения изменений.</h5>
      ) : null}
      <h1>Заявка № {order.number}</h1>
      <div>
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            Дата создания
          </p>
          <input
            id="createDate"
            name="createDate"
            type="text"
            value={new Date(order.createDate).toLocaleString()}
            onChange={changeHandler}
            disabled={true}
          />
        </div>
        {order.lastEditDate ? (
          <div className="input-field ">
            <p className="black-text">Дата последнего редактирования</p>
            <input
              id="lastEditDate"
              name="lastEditDate"
              type="text"
              value={new Date(order.createDate).toLocaleString()}
              onChange={changeHandler}
              disabled={true}
            />
          </div>
        ) : null}
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            Название фирмы заказчика
          </p>
          <input
            id="firmName"
            name="firmName"
            type="text"
            value={order.firmName}
            onChange={changeHandler}
            disabled={!isAuthenticated}
          />
        </div>
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            ФИО заказчика
          </p>
          <input
            id="name"
            name="name"
            type="text"
            className="validate"
            value={order.name}
            onChange={changeHandler}
            disabled={!isAuthenticated}
          />
        </div>
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            Номер телефона
          </p>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className="validate"
            value={order.phoneNumber}
            onChange={changeHandler}
            disabled={!isAuthenticated}
          />
        </div>
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            Коментарии
          </p>
          <textarea
            id="comment"
            name="comment"
            type="text"
            className="materialize-textarea"
            value={order.comment}
            onChange={changeHandler}
            disabled={!isAuthenticated}
          />
        </div>
        <div className="input-field ">
          <p htmlFor="email" className="black-text">
            ati код{' '}
            {order.atiCode ? (
              <a
                href={`http://ati.su/firms/${order.atiCode}/info​`}
                target="_blank"
                rel="noreferrer"
              >{`​ati.su/firms/${order.atiCode}/info​`}</a>
            ) : null}
          </p>

          <input
            id="atiCode"
            name="atiCode"
            type="text"
            className="validate"
            value={order.atiCode}
            onChange={changeHandler}
            disabled={!isAuthenticated}
          />
        </div>
      </div>

      <button
        className="btn green lighten-2"
        style={{ marginRight: '1rem' }}
        disabled={!isAuthenticated || !isUpdated}
        onClick={fetchUpdateOrder}
      >
        Сохранить изменения
      </button>

      <button
        className="btn blue lighten-1"
        style={{ marginRight: '1rem' }}
        onClick={fetchOrder}
        disabled={!isAuthenticated || !isUpdated}
      >
        Сбросить изменения
      </button>
      <button
        className="btn red lighten-2"
        onClick={deleteHandler}
        disabled={!isAuthenticated}
      >
        Удалить заявку
      </button>
    </div>
  )
}
