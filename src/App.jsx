import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    body: "",
    public: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
      .then((response) => {
        console.log("Dati inviati:", response.data);
      })
      .catch((error) => {
        console.error("Errore durante l'invio:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crea un nuovo post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Autore</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Testo del post</label>
          <textarea
            className="form-control"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="public"
            checked={formData.public}
            onChange={handleChange}
          />
          <label className="form-check-label">Rendi pubblico il post</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Invia
        </button>
      </form>
    </div>
  );
}
