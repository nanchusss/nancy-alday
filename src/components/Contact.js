import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";
import emailjs from "@emailjs/browser";

export default function ContactModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(""); // mensaje de estado

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setStatus("");
    }

    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("Mensaje enviado!");
        setForm({
          name: "",
          email: "",
          message: ""
        });
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error al enviar. Intenta nuevamente.");
      });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>{t.landing.modalTitle}</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder={t.landing.namePlaceholder}
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder={t.landing.emailPlaceholder}
            value={form.email}
            onChange={handleChange}
            required
          />

          <Textarea
            name="message"
            placeholder={t.landing.messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            required
          />

          <Button type="submit">
            {t.landing.send}
          </Button>

          {status && <StatusMessage>{status}</StatusMessage>}
        </Form>
      </Modal>
    </Overlay>
  );
}

/* ================= STYLES ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(46, 42, 39, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  width: 90%;
  max-width: 600px;
  background: #E8DED3;
  padding: 60px 40px;
  position: relative;
  animation: slideUp 0.4s ease forwards;

  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #2E2A27;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;
  color: #2E2A27;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Input = styled.input`
  padding: 14px 0;
  border: none;
  border-bottom: 1px solid #6F5A4E;
  background: transparent;
  font-size: 16px;
  color: #2E2A27;

  &:focus {
    outline: none;
    border-bottom: 1px solid #2E2A27;
  }

  /* 🔥 Autofill fix */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #E8DED3 inset !important;
    -webkit-text-fill-color: #2E2A27 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const Textarea = styled.textarea`
  padding: 14px 0;
  border: none;
  border-bottom: 1px solid #6F5A4E;
  background: transparent;
  font-size: 16px;
  min-height: 120px;
  resize: none;
  color: #2E2A27;

  &:focus {
    outline: none;
    border-bottom: 1px solid #2E2A27;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 14px 28px;
  background: transparent;
  border: 1px solid #6F5A4E;
  color: #6F5A4E;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #6F5A4E;
    color: #E8DED3;
  }
`;

const StatusMessage = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #2E2A27;
`;