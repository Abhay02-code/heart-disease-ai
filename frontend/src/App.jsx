import { useState } from "react";
import "./App.css";

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

  const probability = result ? result.probability * 100 : 0;

  return (
    <div className="app">

      {/* Background decoration */}
      <div className="bg-glow bg-glow-one"></div>
      <div className="bg-glow bg-glow-two"></div>

      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">♥</div>

          <div>
            <h1>HeartCare AI</h1>
            <p>Intelligent Heart Disease Assessment</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          AI MODEL ONLINE
        </div>
      </header>

      <main className="main-container">

        {/* Hero */}
        <section className="hero">

          <div className="hero-content">
            <div className="ai-badge">
              <span>✦</span>
              MACHINE LEARNING POWERED
            </div>

            <h2>
              Understand Your
              <span> Heart Health</span>
            </h2>

            <p>
              Enter the patient's clinical information and let our
              machine-learning model analyze the provided health indicators.
            </p>

            <div className="hero-features">
              <div>
                <span>✦</span>
                AI-Powered
              </div>

              <div>
                <span>✓</span>
                Fast Analysis
              </div>

              <div>
                <span>◉</span>
                13 Health Indicators
              </div>
            </div>
          </div>

          <div className="heart-visual">
            <div className="heart-circle">
              <div className="heart-symbol">♥</div>
              <div className="pulse-ring"></div>
              <div className="pulse-ring pulse-ring-two"></div>
            </div>

            <div className="ecg">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </section>

        <div className="dashboard-grid">

          {/* Patient form */}
          <section className="card form-card">

            <div className="card-heading">
              <div className="heading-icon">☷</div>

              <div>
                <h3>Patient Information</h3>
                <p>Enter the patient's clinical parameters</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Basic Information */}
              <div className="section-title">
                <span>01</span>
                Basic Information
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Age</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="1"
                      max="120"
                      required
                    />
                    <span>years</span>
                  </div>
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

              </div>

              {/* Vital Information */}
              <div className="section-title">
                <span>02</span>
                Vital & Blood Information
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Resting Blood Pressure</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="trestbps"
                      value={formData.trestbps}
                      onChange={handleChange}
                      required
                    />
                    <span>mmHg</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Cholesterol</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="chol"
                      value={formData.chol}
                      onChange={handleChange}
                      required
                    />
                    <span>mg/dL</span>
                  </div>
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

              </div>

              {/* Exercise Information */}
              <div className="section-title">
                <span>03</span>
                Exercise & Heart Performance
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Maximum Heart Rate</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="thalach"
                      value={formData.thalach}
                      onChange={handleChange}
                      required
                    />
                    <span>bpm</span>
                  </div>
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
                  <div className="input-wrapper">
                    <input
                      type="number"
                      step="0.1"
                      name="oldpeak"
                      value={formData.oldpeak}
                      onChange={handleChange}
                      required
                    />
                    <span>ST</span>
                  </div>
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

              </div>

              {/* Clinical Information */}
              <div className="section-title">
                <span>04</span>
                Clinical Indicators
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Major Vessels (CA)</label>
                  <select
                    name="ca"
                    value={formData.ca}
                    onChange={handleChange}
                  >
                    <option value="0">0 vessels</option>
                    <option value="1">1 vessel</option>
                    <option value="2">2 vessels</option>
                    <option value="3">3 vessels</option>
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

              <div className="button-row">

                <button
                  type="submit"
                  className="predict-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span>✦</span>
                      Analyze Heart Health
                      <span className="arrow">→</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="reset-button"
                  onClick={resetForm}
                >
                  ↻ Reset
                </button>

              </div>

            </form>

            {error && (
              <div className="error-box">
                <span>!</span>
                {error}
              </div>
            )}

          </section>

          {/* Prediction panel */}
          <aside className="card prediction-card">

            <div className="prediction-header">
              <div>
                <span className="small-label">AI ANALYSIS</span>
                <h3>Prediction Result</h3>
              </div>

              <div className="ai-icon">✦</div>
            </div>

            {!result && !loading && (
              <div className="empty-result">

                <div className="empty-heart">♥</div>

                <h4>Ready to Analyze</h4>

                <p>
                  Complete the patient information and click
                  <strong> Analyze Heart Health </strong>
                  to receive an AI prediction.
                </p>

                <div className="ready-line">
                  <span></span>
                  MODEL READY
                </div>

              </div>
            )}

            {loading && (
              <div className="loading-result">

                <div className="loading-circle">
                  <div className="loading-heart">♥</div>
                </div>

                <h4>Analyzing Patient Data</h4>

                <p>
                  Our machine-learning model is processing the
                  clinical indicators...
                </p>

                <div className="loading-bar">
                  <span></span>
                </div>

              </div>
            )}

            {result && !loading && (
              <div className="result-content">

                <div
                  className={`result-icon ${
                    result.prediction === 1 ? "danger-icon" : "safe-icon"
                  }`}
                >
                  {result.prediction === 1 ? "!" : "✓"}
                </div>

                <div
                  className={`result-status ${
                    result.prediction === 1 ? "danger-text" : "safe-text"
                  }`}
                >
                  {result.prediction === 1
                    ? "Attention Required"
                    : "Lower Risk Indicated"}
                </div>

                <h4>{result.result}</h4>

                <div className="probability-section">

                  <div className="probability-top">
                    <span>Prediction Probability</span>
                    <strong>{probability.toFixed(2)}%</strong>
                  </div>

                  <div className="probability-bar">
                    <div
                      className={
                        result.prediction === 1
                          ? "probability-fill danger-fill"
                          : "probability-fill safe-fill"
                      }
                      style={{ width: `${probability}%` }}
                    ></div>
                  </div>

                </div>

                <div className="prediction-details">

                  <div className="detail-item">
                    <span>Prediction</span>
                    <strong>
                      {result.prediction === 1
                        ? "Positive"
                        : "Negative"}
                    </strong>
                  </div>

                  <div className="detail-item">
                    <span>Model</span>
                    <strong>Random Forest</strong>
                  </div>

                  <div className="detail-item">
                    <span>Features</span>
                    <strong>13 Indicators</strong>
                  </div>

                </div>

                <button
                  className="new-analysis"
                  onClick={resetForm}
                >
                  ↻ Start New Assessment
                </button>

              </div>
            )}

          </aside>

        </div>

        {/* Disclaimer */}
        <div className="disclaimer">

          <div className="disclaimer-icon">ⓘ</div>

          <div>
            <strong>Important Medical Disclaimer</strong>
            <p>
              This application is an educational machine-learning project
              and is not a clinically validated diagnostic system. The
              prediction should not be considered medical advice or used
              as a substitute for consultation with a qualified healthcare
              professional.
            </p>
          </div>

        </div>

      </main>

      <footer>
        <span>HeartCare AI</span>
        <span>•</span>
        <span>Machine Learning Healthcare Project</span>
      </footer>

    </div>
  );
}

export default App;