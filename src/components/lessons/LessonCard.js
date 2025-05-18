import { useNavigate } from "react-router-dom";

const LessonCard = ({ id, title, description, progress, level, buttonText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lesson/${id}`);
  };

  return (
    <div className="lesson-card">
      <div className="lesson-card-header">
        <h3 className="lesson-title">{title}</h3>
        <p className="lesson-description">{description}</p>
      </div>
      <div className="lesson-card-content">
        <div className="lesson-progress">
          <div className="progress-label">
            <span>Прогресс</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress === 100 ? '#10b981' : ''
              }}
            />
          </div>
        </div>
        <div className="lesson-meta">
          <div className="lesson-meta-item">
            <span className="lesson-meta-label">Уровень:</span>
            <span className="lesson-meta-value">{level}</span>
          </div>
        </div>
      </div>
      <div className="lesson-card-footer">
        <button
          className={`btn btn-outline btn-blue w-full`}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;