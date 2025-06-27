"use client";
import React from "react";
import Image from "next/image";

const logos = [
  { src: "/Open AI.png", alt: "OpenAI" },
  { src: "/Mistral.png", alt: "Mistral" },
  { src: "/Claude.png", alt: "Claude" },
  { src: "/Llama 3.png", alt: "Llama 3" },
  { src: "/cohere.png", alt: "Cohere" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#eaf6ff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 900, borderRadius: 24, marginTop: 48, marginBottom: 48 }}>
        <h1 style={{ color: "#007bff", fontWeight: 700, fontSize: 40, textAlign: "center", marginBottom: 24, marginTop: 0, lineHeight: 1.1 }}>
          Bienvenue sur le comparatif des<br />modèles d'IA
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24 }}>
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={80}
              height={80}
              style={{ borderRadius: "50%", background: "#fff", boxShadow: "0 2px 12px #d0e8ff", objectFit: "cover" }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", color: "#1a3557", fontSize: "1.18em", marginBottom: 8, marginTop: 0, fontWeight: 400 }}>
          Explorez et comparez les intelligences artificielles les plus avancées pour l'éducation et la vie quotidienne.<br />
          Ce site vous aide à choisir l'IA la plus adaptée à vos besoins grâce à des analyses claires et des retours d'expérience.
        </div>
        <div className="card-section" style={{ background: "#d0e8ff", color: "#1a3557", borderRadius: 12, marginTop: 32 }}>
          <h2 style={{ color: "#2176c1", fontWeight: 700, fontSize: "1.2em", marginBottom: 8, marginTop: 0 }}>À propos du créateur</h2>
          <p style={{ color: "#1a3557", fontSize: "1.08em", marginBottom: 0 }}>
            Ce site a été conçu par Camille Calvar, passionné par l'intelligence artificielle et l'éducation numérique. L'objectif est de rendre accessible la comparaison des IA pour tous, enseignants, élèves ou curieux.
          </p>
        </div>
        <div className="card-section" style={{ background: "#d0e8ff", color: "#1a3557", borderRadius: 12 }}>
          <h2 style={{ color: "#2176c1", fontWeight: 700, fontSize: "1.2em", marginBottom: 8, marginTop: 0 }}>Pourquoi ce site ?</h2>
          <p style={{ color: "#1a3557", fontSize: "1.08em", marginBottom: 0 }}>
            Face à la multiplication des modèles d'IA, il devient difficile de s'y retrouver. Ce site propose une analyse claire et objective pour aider chacun à choisir l'outil le plus adapté à ses besoins scolaires ou professionnels.
          </p>
        </div>
        <div className="card-section" style={{ background: "#d0e8ff", color: "#1a3557", borderRadius: 12 }}>
          <h2 style={{ color: "#2176c1", fontWeight: 700, fontSize: "1.2em", marginBottom: 8, marginTop: 0 }}>Ce que vous allez trouver</h2>
          <p style={{ color: "#1a3557", fontSize: "1.08em", marginBottom: 0 }}>
            • Un tableau comparatif détaillé des principaux modèles d'IA<br />
            • Un graphique interactif des performances<br />
            • Les avis et retours d'expérience des utilisateurs<br />
            • Une interface simple et accessible à tous
          </p>
        </div>
        <a
          href="/comparatif"
          className="cta-btn"
          style={{ marginTop: 32, textAlign: 'center', textDecoration: 'none', display: 'block' }}
        >
          Voir le comparatif
        </a>
        <a href="mailto:Camille.calvar09@gmail.com" className="mail-float-btn">Contactez-nous</a>
      </div>
    </div>
  );
}
