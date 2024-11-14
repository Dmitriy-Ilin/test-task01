import "./App.css";

import React, { useState } from "react";
import Payment from "./pages/Payment";
import { saveSale } from "./api/api";
import DataForm from "./components/DataForm";
import CertificateList from "./components/CertificateList";

const App = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isPayment, setIsPayment] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleBack = () => {
    setSelectedCertificate(null);
    setIsPayment(false);
  };

  const handleSubmitForm = async (data) => {
    const saleData = {
      Id: Number(selectedCertificate.ID),
      TableName: selectedCertificate.TABLENAME,
      PrimaryKey: selectedCertificate.PRIMARYKEY,
      Price: Number(selectedCertificate.PRICE),
      Summa: Number(selectedCertificate.SUMMA),
      ClientName: data.name,
      Phone: data.phone,
      Email: data.email,
      MsgText: data.message,
      PaymentTypeId: 2,
      UseDelivery: 0,
    };

    console.log(saleData);
    setLoading(true);
    try {
      const response = await saveSale(saleData);
      if (response.result === 0) {
        setFormData(data);
        setIsPayment(true);
      } else {
        alert(
          "Ошибка при сохранении данных о продаже: " +
            response.resultdescription
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при отправке данных о продаже:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : isPayment ? (
        <Payment onBack={handleBack} />
      ) : selectedCertificate ? (
        <DataForm
          certificate={selectedCertificate}
          onSubmit={handleSubmitForm}
          onBack={handleBack}
        />
      ) : (
        <CertificateList onSelect={handleSelectCertificate} />
      )}
    </div>
  );
};

export default App;
