import { useRef } from "react";

const Editor = ({ onExecute, onCheckSolution, solutionStatus }) => {
    const editorTextAreaRef = useRef(null);
    
    const handleExecuteClick = () => {
        const query = editorTextAreaRef.current.value.trim();
        if (query && onExecute) {
            onExecute(query);
        }
    };
    
    const handleCheckClick = () => {
        const query = editorTextAreaRef.current.value.trim();
        if (query && onCheckSolution) {
            onCheckSolution(query);
        }
    };
    
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Редактор SQL</h2>
            </div>

            <div className="card-content">
                <div className="sql-editor">
                    <textarea
                        className="sql-editor-textarea"
                        spellCheck="false"
                        ref={editorTextAreaRef}
                    />
                </div>

                <div className="sql-editor-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleExecuteClick}
                    >
                        Выполнить
                    </button>
                    <button
                        className="btn btn-outline btn-blue"
                        onClick={handleCheckClick}
                    >
                        Проверить решение
                    </button>
                </div>

                {solutionStatus && (
                    <div className={`solution-status ${solutionStatus.type}`}>
                        {solutionStatus.message}
                    </div>
                )}
            </div> 
        </div>
    );
};

export default Editor;