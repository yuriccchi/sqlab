import { useParams } from "react-router-dom";   
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import Editor from "../components/trainer/Editor";

const Lesson_1 = () => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="page-header">
          <div className="page-header-content">
          </div>
        </div>
        
        <div className="lesson-content">
          {/* Здесь будет содержимое урока */}
          {/*<p>Это страница урока {lesson.title}</p>*/}
          <p>Здесь будет наполнение урока...</p>
          <Editor />
        </div>
      </div>
    </main>
  );
};

export default Lesson_1;