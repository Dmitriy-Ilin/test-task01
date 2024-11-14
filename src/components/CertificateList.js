import React, { useEffect, useState } from "react";
import { getGoodList } from "../api/api";

const CertificateList = ({ onSelect }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const data = await getGoodList();
        setCertificates(data.data);
      } catch (error) {
        console.error("Ошибка при получении списка сертификатов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [setLoading]);

  if (loading) {
    return <div className="loading">Загрузка сертификатов...</div>;
  }

  return (
    <div>
      <h1 className="certificate-title">Выберите сертификат</h1>
      <ul>
        {certificates.map((cert) => (
          <li key={cert.ID}>
            <h2>{cert.NAME}</h2>
            <p>{cert.DESCRIPTION}</p>
            <div>
              <span>Скидка: {Math.floor(cert.DISCOUNT)}%</span>{" "}
              <p>Цена со скидкой: {cert.SUMMA}</p>
            </div>

            <button onClick={() => onSelect(cert)}>Оформить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificateList;
