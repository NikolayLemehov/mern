import React, {useState} from 'react';

const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const changeHandler = (evt) => {
    setForm({...form, [evt.target.name]: [evt.target.value]})
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field focus-yellow">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field focus-yellow">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4">Войти</button>
            <button className="btn grey lighten-1 black-text">Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
