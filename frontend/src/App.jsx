import { useState } from "react";

const API_URL = "https://heart-disease-ai-7xux.onrender.com";

const initialForm = {
  age: 50,
  sex: 1,
  cp: 1,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 0,
  thalach: 150,
  exang: 0,
  oldpeak: 1,
  slope: 1,
  ca: 0,
  thal: 3
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL + "/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: Number(formData.age),
          sex: Number(formData.sex),
          cp: Number(formData.cp),
          trestbps: Number(formData.trestbps),
          chol: Number(formData.chol),
          fbs: Number(formData.fbs),
          restecg: Number(formData.restecg),
          thalach: Number(formData.thalach),
          exang: Number(formData.exang),
          oldpeak: Number(formData.oldpeak),
          slope: Number(formData.slope),
          ca: Number(formData.ca),
          thal: Number(formData.thal)
        })
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the prediction server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setResult(null);
    setError("");
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Heart Disease AI</h1>
          <p>Machine Learning Based Heart Disease Prediction</p>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h2>Patient Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Chest Pain Type</label>
                <select
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                >
                  <option value="1">Typical Angina</option>
                  <option value="2">Atypical Angina</option>
                  <option value="3">Non-anginal Pain</option>
                  <option value="4">Asymptomatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Resting Blood Pressure</label>
                <input
                  type="number"
                  name="trestbps"
                  value={formData.trestbps}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cholesterol</label>
                <input
                  type="number"
                  name="chol"
                  value={formData.chol}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Fasting Blood Sugar</label>
                <select
                  name="fbs"
                  value={formData.fbs}
                  onChange={handleChange}
                >
                  <option value="0">Normal</option>
                  <option value="1">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Resting ECG</label>
                <select
                  name="restecg"
                  value={formData.restecg}
                  onChange={handleChange}
                >
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>

              <div className="form-group">
                <label>Maximum Heart Rate</label>
                <input
                  type="number"
                  name="thalach"
                  value={formData.thalach}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Exercise Induced Angina</label>
                <select
                  name="exang"
                  value={formData.exang}
                  onChange={handleChange}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Oldpeak</label>
                <input
                  type="number"
                  step="0.1"
                  name="oldpeak"
                  value={formData.oldpeak}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slope</label>
                <select
                  name="slope"
                  value={formData.slope}
                  onChange={handleChange}
                >
                  <option value="1">Upsloping</option>
                  <option value="2">Flat</option>
                  <option value="3">Downsloping</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of Major Vessels (CA)</label>
                <select
                  name="ca"
                  value={formData.ca}
                  onChange={handleChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="form-group">
                <label>Thalassemia</label>
                <select
                  name="thal"
                  value={formData.thal}
                  onChange={handleChange}
                >
                  <option value="3">Normal</option>
                  <option value="6">Fixed Defect</option>
                  <option value="7">Reversible Defect</option>
                </select>
              </div>

            </div>

            <div className="buttons">
              <button
                type="submit"
                className="predict-btn"
                disabled={loading}
              >
                {loading ? "Predicting..." : "Predict Heart Disease"}
              </button>

              <button
                type="button"
                className="reset-btn"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {result && (
            <div
              className={`result ${
                result.prediction === 1 ? "danger" : "safe"
              }`}
            >
              <h2>{result.result}</h2>

              <p>
                Prediction: <strong>{result.prediction}</strong>
              </p>

              <p>
                Probability:{" "}
                <strong>
                  {(result.probability * 100).toFixed(2)}%
                </strong>
              </p>
            </div>
          )}
        </section>

        <section className="disclaimer">
          <strong>Disclaimer:</strong> This is an educational
          machine-learning project and is not a clinically validated
          diagnostic system. It should not be used as a substitute for
          professional medical advice.
        </section>
      </main>
    </div>
  );
}

export default App;