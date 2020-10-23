import { Button } from 'antd'
import React, { useState } from 'react'
import { useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import "./App.less"

const App = () => {
  return (
    <div className="app">
      <Exchange />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

const fetchExchange = async (currency) => {
  const respone = await fetch(`https://aapi.ratesapi.io/api/latest?base=${currency}`)
  const data = await respone.json()
  return data;
}

function Exchange() {
  const [currency, setCurrency] = useState('USD')
  const { status, data } = useQuery(currency, fetchExchange)
  if (status === "loading") return <div>loading...</div>
  if (status === "error") return <div>there was an error... sorry</div>
  return (
    <div>
      <Button type="primary" style={{ margin: "1rem" }} onClick={() => setCurrency('USD')}>USD</Button>
      <Button type="primary" style={{ margin: "1rem" }} onClick={() => setCurrency('CAD')}>CAD</Button>
      <Button type="primary" style={{ margin: "1rem" }} onClick={() => setCurrency('EUR')}>USD</Button>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default App
