function Balance() {
  //   const [balance, setBalance] = useState(500.0)
  const balance = 500.0

  return (
    <div className=":uno: mb-8 flex justify-between items-end">
      <div>
        <div className=":uno: text-sm opacity-80 mb-2">Your Balance</div>
        <div className=":uno: text-3xl font-bold">${balance.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Balance
