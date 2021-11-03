import React from 'react'
//This creates a page for the seller to track their data. 

//TODO 
//WHEN a sale is made 
//THEN the value of my sale is added to the chart. 
//WHEN I make a sale 
//THEN a counter is triggered named after that category. 
//WHEN I make a sale
//THEN I 


//This provides the 1) overall sales number 
// 2) Top Selling Products BY CATEGORY (this simplifies more than by name)
// 3) This Creates a basic transaction history in line by line format to highlight old 

const BusinessTools = () => {
  return (
    <div>
      <Jumbotron>
        <h1>My Sales</h1>
      </Jumbotron>

      <div class="form">
      <input type="text" id="t-name" placeholder="Transaction Name" />
      <input type="number" min="0" id="t-amount" placeholder="Transaction amount" />
      <button id="add-btn"><i class="fa fa-plus buttons"></i> Add Sale!</button>
      <p class="error"></p>
     </div>


      <div class="transactions">
      <table>
        <thead>
          <th>Transaction</th>
          <th>Amount</th>
        </thead>
        <tbody id="tbody">
    
        </tbody>
      </table>
    </div>
    
    <canvas id="myChart"></canvas>
    <script src="index.js"></script>

    <h1>Highest Grossing Products</h1>
    <div class="topsellers">
      <table>
        <thead>
          <th>Product Name</th>
          <th>Total Value</th>
        </thead>
        <tbody id="tbody1">
    
        </tbody>
      </table>
    </div>

    <h1>Transaction History</h1>
    <div class="history">
      <table>
        <thead>
          <th>Transaction Name</th>
          <th>Transaction Price</th>
          <th>Transaction Date</th>
        </thead>
        <tbody id="tbody2">
    
        </tbody>
      </table>
    </div>
    
    <h1></h1>
  </div>
  );
};
export default BusinessTools
