import React from "react";
import NotFoundImage from "../../assets/images/not-found.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found ">
      <div>
        <div>
          <img
            src={NotFoundImage}
            className="img-fluid"
            alt=":("
            width={600}
            height={600}
          />
        </div>
        <h1>Страница не найдена</h1>
        <h3>Страница, которую вы искали, не существует</h3>
        <h4>
          Возможно, вы ошиблись адресом или страница могла быть перемещена
        </h4>
        <p>
          <Link to="/">Вернуться на главную</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
