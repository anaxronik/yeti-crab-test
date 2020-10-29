import React, { useCallback, useEffect, useState } from 'react'
import { OrdersList } from '../../components/OrdersList/OrdersList'
import { useHttp } from '../../hooks/http.hook'

export const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [searchOrders, setSearchOrders] = useState([])
  const [searchMode, setSearchMode] = useState(false)
  const { request } = useHttp()

  const fetchOrders = useCallback(async () => {
    try {
      const data = await request('/api/order/', 'GET')
      setOrders(data)
    } catch (error) {
      console.log('Error in fetchOrders')
    }
  }, [request])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const searchChangeHandler = async (event) => {
    if (!event.target.value.length) {
      setSearchMode(false)
    } else {
      setSearchMode(true)
      let filtredOrders = []
      orders.forEach((order) => {
        Object.keys(order).forEach((key) => {
          if (
            order[key] &&
            order[key]
              .toString()
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          ) {
            if (!filtredOrders.includes(order)) {
              filtredOrders.push(order)
            }
          }
        })
      })
      setSearchOrders(filtredOrders)
      // console.log(newOrders
    }
  }

  return (
    <div>
      <label>
        <input type="checkbox" />
        <span>Red</span>
      </label>
      <form className="">
        <div className="row">
          <div className="input-field ">
            <textarea
              className="materialize-textarea"
              onChange={searchChangeHandler}
            ></textarea>
            <label for="icon_prefix2">Поиск заявки</label>
          </div>
        </div>
      </form>
      {searchMode ? (
        <OrdersList orders={searchOrders} />
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  )
}
