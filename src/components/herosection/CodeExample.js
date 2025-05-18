import React from 'react';

const CodeExample = () => {
    const code = `SELECT 
  customers.name, 
  COUNT(orders.id) AS total_orders,
  SUM(orders.amount) AS total_spent
FROM 
  customers
JOIN 
  orders ON customers.id = orders.customer_id
GROUP BY 
  customers.id
HAVING 
  COUNT(orders.id) > 5
ORDER BY 
  total_spent DESC
LIMIT 10; 
  `;
  
    return (
      <div className="code-example">
        <div className="code-header">
          <div className="code-title">SQL Query</div>
        </div>
        <pre className="code-block"><code>{code}</code></pre>
      </div>
    );
  };
  
  export default CodeExample;