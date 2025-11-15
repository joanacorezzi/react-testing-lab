import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  //keep track of the list of transactions
  const [transactions,setTransactions] = useState([])
  //keep track of the current search term
  const [search,setSearch] = useState("")
  
//fetch the inital list of transactions when the component first loads
  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[]) //only runs once

  //send a new transaction to the server and update state with the response 
  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=> { setTransactions(prev => [...prev, data]); // add new transaction on the existing list
    })

  }
  
  // placeholder for sort logic
  function onSort(sortBy){
    
  }

  // Filter using search here and pass new variable down
  

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
