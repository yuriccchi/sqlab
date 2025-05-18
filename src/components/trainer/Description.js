const Description = ({ task }) => {
  return (
    <div className="description-card">
        <div className="description-header">
            <h2 className="description-title">Задание</h2>
        </div>

        <div className="description-content">
            <p className="description-text">
                {task ? task.question_text: ""}
            </p>
        </div>
    </div>
  );
};

export default Description;