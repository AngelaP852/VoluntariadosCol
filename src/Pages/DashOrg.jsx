import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Styles/DashOrg.css";

const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#94a3b8" strokeWidth="2"/>
    <path d="M8 3v4M16 3v4M3 10h18" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="#94a3b8" strokeWidth="2" />
    <circle cx="9" cy="7" r="4" stroke="#94a3b8" strokeWidth="2"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="#94a3b8" strokeWidth="2"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#94a3b8" strokeWidth="2"/>
  </svg>
);
const IconTrend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 3v18h18" stroke="#94a3b8" strokeWidth="2"/>
    <path d="M19 7l-6 6-4-4-4 4" stroke="#94a3b8" strokeWidth="2" fill="none"/>
  </svg>
);
const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#94a3b8" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
  </svg>
);

export default function DashboardOrg() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(
  localStorage.getItem("username") ||
  localStorage.getItem("displayName") ||
  ""
  );
  
  useEffect(() => {
  const auth = getAuth();
  const unsub = onAuthStateChanged(auth, (user) => {
    let name =
      localStorage.getItem("username") ||
      localStorage.getItem("displayName") ||
      "";

    if (!name && user) {
      name = user.displayName || (user.email ? user.email.split("@")[0] : "");
    }

    setUserName(name || "Mi Organización");
    if (name) localStorage.setItem("displayName", name);
  });

  return () => unsub();
}, []);

  const [tab, setTab] = useState("actividades");

  const kpis = [
    { title: "Actividades Publicadas", value: "2", hint: "Total de actividades creadas", Icon: IconCalendar },
    { title: "Participantes Totales", value: "41", hint: "Voluntarios inscritos", Icon: IconUsers },
    { title: "Horas de Impacto", value: "200", hint: "Horas de voluntariado generadas", Icon: IconTrend },
    
  ];

  const actividades = [
    {
      id: 1,
      titulo: "Beach Cleanup Drive",
      estado: "Publicada",
      descripcion:
        "Join us for a morning of cleaning up our local beaches and protecting marine life.",
      lugar: "Santa Monica Beach",
      fecha: "15/2/2024",
      inscritos: "23/50 inscritos",
    },
  ];

  return (
    <div className="dash-page">
      {/* NAVBAR dentro del dashboard */}
      <header className="dash-navbar">
        <div className="dash-nav-inner">
          <a href="/" className="nav-brand">
            <img src="/icono.png" alt="Voluntariados Col" className="nav-logo" />
            <span className="brand-text">VolunteerHub</span>
          </a>

          <nav className="nav-menu">
            
            <a href="/ranking">Ranking</a>
            <a href="/organizaciones">Organizaciones</a>
            <a href="/dashboard">Dashboard</a>
          </nav>

          <div className="button-close">
            <button className="btn ghost" onClick={() => navigate("/")}>Cerrar Sesión</button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="dashboard">
        {/* Header página */}
        <div className="page-header">
          <div>
            <h1 className="page-title">{userName || "Mi Organización"}</h1>
            <p className="page-subtitle">Gestiona tus actividades de voluntariado</p>
          </div>

          <button
            className="btn primary new-activity"
            onClick={() => navigate("/org/actividades/nueva")}
          >
            <span className="plus">+</span> Nueva Actividad
          </button>
        </div>

        {/* KPIs */}
        <section className="kpi-grid">
          {kpis.map(({ title, value, hint, Icon }) => (
            <article key={title} className="kpi-card">
              <div className="kpi-head">
                <h3>{title}</h3>
                <span className="kpi-icon" aria-hidden><Icon /></span>
              </div>
              <div className="kpi-value">{value}</div>
              <div className="kpi-hint">{hint}</div>
            </article>
          ))}
        </section>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${tab === "actividades" ? "active" : ""}`} onClick={() => setTab("actividades")}>Mis Actividades</button>
          
          <button className={`tab ${tab === "analiticas" ? "active" : ""}`} onClick={() => setTab("analiticas")}>Analíticas</button>
        </div>

        {/* Panel listado */}
        <section className="panel">
          <div className="panel-head">
            <h2>Actividades Recientes</h2>
            <p>Gestiona tus actividades de voluntariado</p>
          </div>

          <div className="activity-list">
            {actividades.map((a) => (
              <article key={a.id} className="activity-item">
                <div className="activity-main">
                  <div className="activity-title">
                    <h3>{a.titulo}</h3>
                    <span className="badge published">Publicada</span>
                  </div>
                  <p className="activity-desc">{a.descripcion}</p>
                  <div className="activity-meta">
                    <span>{a.lugar}</span>
                    <span>{a.fecha}</span>
                    <span>{a.inscritos}</span>
                  </div>
                </div>

                <div className="activity-actions">
                  <button className="btn ghost" onClick={() => navigate(`/org/actividades/${a.id}/editar`)}>Editar</button>
                  <button className="btn ghost" onClick={() => handleDeleteActivity(a.id)}>Eliminar</button>
                  <button className="btn ghost" onClick={() => navigate(`/org/actividades/${a.id}/inscritos`)}>Ver Inscritos</button>
                  <button className="btn light" onClick={() => navigate(`/org/actividades/${a.id}`)}>Ver Detalles</button>
                  
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
