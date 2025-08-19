import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function ArbCalculator() {
  const [arbData, setArbData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [includeLiveEvents, setIncludeLiveEvents] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { flag, budget } = location.state || {};

 const handleArbClick = async () => {
  setLoading(true);
  setError(null);
  try {
    const API_BASE =
      process.env.REACT_APP_API_BASE ||
      (typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app")
        ? "https://arb-bot-backend.onrender.com"
        : "http://127.0.0.1:8000");

    console.log("Using API_BASE:", API_BASE);

    const response = await axios.get(`${API_BASE}/api/arb/`, {
      params: { flag, budget, includeLiveEvents }
    });

    setArbData(response.data);
    console.log("arbData:", response.data);
  } catch (e) {
    console.error("Error fetching arbitrage data:", e);
    setError("Failed to fetch arbitrage data. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  const hasFetched = Array.isArray(arbData);
  const hasArbData = hasFetched && arbData.length > 0;

  return (
    <div className="arb-scope">
      {/* Local-only styles */}
      <style>{`
        /* scope */
        .arb-scope, .arb-scope * { box-sizing: border-box; }
        .arb-page{ min-height:100vh; background:#4e9160; background-image:linear-gradient(180deg,#4e9160,#3b6e47); padding:32px 16px 64px; }
        .arb-container{ max-width:920px; margin:0 auto; }

        .arb-title{ font-weight:800; color:#10341f; text-align:center; margin-bottom:4px; }
        .arb-subtitle{ color:rgba(0,0,0,.65); text-align:center; margin-bottom:18px; }

        .arb-controls{ background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.35);
          backdrop-filter:blur(6px); border-radius:14px; padding:14px 18px; margin-bottom:18px; display:flex;
          flex-direction:column; gap:12px; align-items:center; justify-content:space-between; }
        @media (min-width:768px){ .arb-controls{ flex-direction:row; } }

        .arb-btn{ background:#0d6efd; color:#fff; border:none; font-weight:700; border-radius:12px; padding:12px 18px;
          box-shadow:0 10px 20px rgba(13,110,253,.35); transition:transform .12s ease, box-shadow .12s ease; }
        .arb-btn:hover{ transform:translateY(-1px); box-shadow:0 14px 30px rgba(13,110,253,.35); }
        .arb-btn:disabled{ opacity:.85; cursor:not-allowed; }
        .arb-btn.arb-glow{ animation:arb-pulse 1.2s infinite ease-in-out; }
        @keyframes arb-pulse{
          0%{ box-shadow:0 0 0 0 rgba(13,110,253,.45); }
          70%{ box-shadow:0 0 0 18px rgba(13,110,253,0); }
          100%{ box-shadow:0 0 0 0 rgba(13,110,253,0); }
        }

        .arb-hint, .arb-card{ background:#fff; border-radius:16px; padding:18px; box-shadow:0 10px 30px rgba(0,0,0,.15); }
        .arb-hint{ text-align:center; }

        .arb-section-title{ color:#0f172a; font-weight:800; text-align:center; margin:12px 0 6px; }
        .arb-stack{ display:grid; gap:14px; }

        .arb-row-title{ color:#0f172a; font-weight:700; margin:0; }
        .arb-muted{ color:#64748b; }

        .arb-badge{ border-radius:999px; padding:6px 10px; font-weight:800; font-size:.9rem; background:#e2e8f0; color:#0f172a; }
        .arb-badge.good{ background:#dcfce7; color:#166534; }
        .arb-badge.ok{ background:#fef9c3; color:#854d0e; }
        .arb-badge.bad{ background:#fee2e2; color:#991b1b; }

        .arb-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 16px; margin-top:12px; }
        @media (min-width:768px){ .arb-grid{ grid-template-columns:repeat(4,minmax(0,1fr)); } }
        .arb-meta-label{ display:block; font-size:.8rem; text-transform:uppercase; letter-spacing:.04em; color:#64748b; }
        .arb-meta-val{ color:#0f172a; font-weight:600; }
      `}</style>

      <div className="arb-page">
        <div className="arb-container">
          <header className="text-center">
            <h1 className="arb-title">Arbitrage Calculator</h1>
            <p className="arb-subtitle">Scan books and surface live edges.</p>
          </header>

          <div className="arb-controls">
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="includeLiveEvents"
                checked={includeLiveEvents}
                onChange={(e) => setIncludeLiveEvents(e.target.checked)}
              />
              <label className="form-check-label ms-2" htmlFor="includeLiveEvents">
                Include Live Events
              </label>
            </div>

            <button
              className={`arb-btn ${loading ? 'arb-glow' : ''}`}
              onClick={handleArbClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Scanning…
                </>
              ) : (
                '$$$  Find Arbs'
              )}
            </button>
          </div>

          {error && <div className="alert alert-danger shadow-sm">{error}</div>}

          {!hasFetched && (
            <div className="arb-hint">
              <h5 className="mb-1">Ready to scan</h5>
              <p className="text-muted m-0">Click “Find Arbs” to fetch opportunities.</p>
            </div>
          )}

          {hasFetched && !hasArbData && (
            <div className="arb-hint">
              <h5 className="mb-1">No arbitrage opportunities</h5>
              <p className="text-muted m-0">Try toggling live events or scanning again later.</p>
            </div>
          )}

          {hasArbData && (
            <section className="mt-3">
              <h2 className="arb-section-title">Arbitrage Opportunities</h2>
              <div className="arb-stack">
                {arbData.map((arb, idx) => {
                  const roiPct = (arb.arb_check ?? 0) * 100;
                  const roiClass = roiPct >= 2 ? 'good' : roiPct > 0 ? 'ok' : 'bad';
                  return (
                    <article key={idx} className="arb-card">
                      <div className="d-flex align-items-start justify-content-between flex-wrap gap-2">
                        <h5 className="arb-row-title">
                          {arb.home_team} <span className="arb-muted">vs.</span> {arb.away_team}
                        </h5>
                        <span className={`arb-badge ${roiClass}`}>ROI {roiPct.toFixed(2)}%</span>
                      </div>

                      <div className="arb-grid">
                        <div>
                          <span className="arb-meta-label">Bookmakers</span>
                          <div className="arb-meta-val">
                            {arb.bookmaker_1} <span className="arb-muted">vs.</span> {arb.bookmaker_2}
                          </div>
                        </div>
                        <div>
                          <span className="arb-meta-label">Sport</span>
                          <div className="arb-meta-val">{arb.sport_title || '—'}</div>
                        </div>
                        <div>
                          <span className="arb-meta-label">Bet Type</span>
                          <div className="arb-meta-val text-capitalize">
                            {arb.market_key}{arb.point != null ? ` (${arb.point})` : ''}
                          </div>
                        </div>
                        <div>
                          <span className="arb-meta-label">Odds</span>
                          <div className="arb-meta-val">
                            {arb.odds_1} <span className="arb-muted">/</span> {arb.odds_2}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArbCalculator;

