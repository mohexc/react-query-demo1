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

const fetchExchange = async () => {
  const respone = await fetch('https://api.ratesapi.io/api/latest?base=CAD')
  const data = await respone.json()
  return data;
}

function Exchange() {
  const { status, data, error } = useQuery("latest", fetchExchange)
  if (status === "loading") return <div>loading...</div>
  if (status === "error") return <div>error! {error}</div>
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default App
