import React, { useRef, useState } from "react";
import ReactInputMask from "react-input-mask";

const DataForm = ({ certificate, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const phoneInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Имя обязательно";

    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!formData.phone) {
      newErrors.phone = "Телефон обязателен";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }

    if (!formData.email) newErrors.email = "Почта обязательна";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Некорректный email";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { phone, ...rest } = formData;
    const formattedPhone = phone.replace(/\D/g, "").substring(1);
    onSubmit({ ...rest, phone: formattedPhone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Сертификат на {Math.floor(certificate.PRICE)}</p>
      <p>Цена: {Math.floor(certificate.SUMMA)}</p>
      <h1>Заполните контактные данные</h1>

      <div className="input">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="input"
          style={{ borderColor: errors.name ? "red" : "#ccc" }}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="input">
        <ReactInputMask
          mask="+7 (999) 999-99-99"
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          placeholder="Телефон"
          inputRef={phoneInputRef}
          className="input"
          style={{ borderColor: errors.phone ? "red" : "#ccc" }}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>

      <div className="input">
        <input
          type="email"
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
          style={{ borderColor: errors.email ? "red" : "#ccc" }}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <input
        type="text"
        name="message"
        placeholder="Сообщение"
        value={formData.message}
        onChange={handleChange}
      />

      <div className="buttons">
        <button type="submit">Оплатить</button>
        <button type="button" onClick={onBack}>
          Назад
        </button>
      </div>
    </form>
  );
};

export default DataForm;
