import React from 'react'
import { useHistory } from 'react-router-dom'

export const OrdersList = ({ orders }) => {
  const history = useHistory()

  if (!orders.length) {
    return <p className="center">Заявок пока нет</p>
  } else {
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>№</th>
            <th>Дата создания</th>
            <th>Фирма</th>
            <th>Имя заказчика</th>
            <th>Номер телефона</th>
            <th>ati код</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  console.log('click', order._id)
                  history.push(`/orders/${order._id}`)
                }}
              >
                <td>{order.number}</td>
                <td>{new Date(order.createDate).toLocaleDateString()}</td>
                <td>{order.firmName}</td>
                <td>{order.name}</td>
                <td>{order.phoneNumber}</td>
                <td>
                  <a
                    href={`http://ati.su/firms/${order.atiCode}/info​`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {order.atiCode}
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
