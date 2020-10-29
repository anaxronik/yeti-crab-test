import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { OrdersPage } from './pages/OrdersPage/OrdersPage'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { CreatePage } from './pages/CreatePage/CreatePage'
import { DetailPage } from './pages/DetailPage/DetailPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/orders/:id" exact component={DetailPage} />
        <Route path="/orders" exact component={OrdersPage} />
        <Route path="/create" exact component={CreatePage} />
        <Redirect to="/orders" />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/orders/:id" exact component={DetailPage} />
        <Route path="/orders" exact component={OrdersPage} />
        <Route path="/create" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact component={AuthPage} />
        <Redirect to="/orders" />
      </Switch>
    )
  }
}
