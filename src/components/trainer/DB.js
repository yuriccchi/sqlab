import React from "react";

const DB = () => {
  return (
    <div className="db-tables">
        <div className="db-table">
            <div className="db-table-header">
            <h3 className="db-table-name">customers</h3>
            </div>
            <div className="db-table-columns">
            id, name, email, address, created_at
            </div>
        </div>

        <div className="db-table">
            <div className="db-table-header">
            <h3 className="db-table-name">orders</h3>
            </div>
            <div className="db-table-columns">
            id, customer_id, amount, status, created_at, product_id
            </div>
        </div>

        <div className="db-table">
            <div className="db-table-header">
            <h3 className="db-table-name">products</h3>
            </div>
            <div className="db-table-columns">
            id, name, description, price, category_id, in_stock
            </div>
        </div>

        <div className="db-table">
            <div className="db-table-header">
            <h3 className="db-table-name">categories</h3>
            </div>
            <div className="db-table-columns">
            id, name, description
            </div>
        </div>
    </div>
  );
};

export default DB;