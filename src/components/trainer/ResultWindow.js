const ResultWindow = ({ result }) => {
  if (!result) {
    return (
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Результаты запроса</h2>
        </div>
        <div className="card-content">
          <div className="empty-result">Здесь будут отображаться результаты вашего запроса</div>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Ошибка</h2>
        </div>
        <div className="card-content error-message">
          {result.error}
        </div>
      </div>
    );
  }

  if (result.length === 0) {
    return (
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Результаты запроса</h2>
        </div>
        <div className="card-content">
          <div className="empty-result">Запрос не вернул результатов</div>
        </div>
      </div>
    );
  }

  const columns = Object.keys(result[0]);
  
  return (
    <div className="card mt-6">
      <div className="card-header">
        <h2 className="card-title">Результаты запроса</h2>
      </div>
      <div className="card-content">
        <div className="results-table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={`${i}-${col}`}>{row[col] !== null ? String(row[col]) : 'NULL'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultWindow;