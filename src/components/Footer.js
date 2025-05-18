import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          &copy; <span id="currentYear"></span> SQLab
        </p>
        <div className="footer-links">
          <p className="copyright">Подробнее о курсовой тут:</p>
          <a 
            href="/documents/Техническое задание.pdf" 
            className="footer-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Техническое задание
          </a>
          <a 
            href="/documents/Руководство пользователя.pdf" 
            className="footer-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Руководство пользователя
          </a>
        </div>
      </div>
    </footer>
  );
}