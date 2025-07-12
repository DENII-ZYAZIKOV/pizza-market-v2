import React, { useState } from "react";

interface OrderFormProps {
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function validate() {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Введите имя";
    if (!phone.trim()) newErrors.phone = "Введите телефон";
    else if (!/^\d{10,}$/.test(phone.replace(/\D/g, "")))
      newErrors.phone = "Телефон должен содержать минимум 10 цифр";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, phone, email });
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Оформление заказа</h2>
      <div className="order-form__field">
        <label>Имя*</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="order-form__error">{errors.name}</div>}
      </div>
      <div className="order-form__field">
        <label>Телефон*</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Только цифры"
        />
        {errors.phone && (
          <div className="order-form__error">{errors.phone}</div>
        )}
      </div>
      <div className="order-form__field">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <button className="button pay-btn" type="submit">
        Подтвердить заказ
      </button>
    </form>
  );
};

export default OrderForm;
