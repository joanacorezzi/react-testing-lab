import React from "react";

function AddTransactionForm({postTransaction}) {
  //handle the form submission 
  function submitForm(e){
    e.preventDefault() //stop the page from refreshing when the form sumbmits

const form = e.currentTarget; //get the form element the triggered the submit 

//create a new transaction object 
  const newTransaction = {
   date: form.date.value,
    description: form.description.value,
    category: form.category.value,
    amount: form.amount.value,
    }
    //call the function from the parent to add the new transaction 
    postTransaction(newTransaction);

    //clear form
    form.reset();

  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={(e)=>{submitForm(e)}}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
