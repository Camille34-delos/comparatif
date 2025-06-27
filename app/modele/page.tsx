/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ModelInfo {
  nom: string;
  createur: string;
  date: string;
  description: string;
  points_forts: string;
  points_faibles: string;
  site: string;
}

const modeles: Record<string, ModelInfo> = {
  "GPT-4o": {
    nom: "GPT-4o",
    createur: "OpenAI",
    date: "Mai 2024",
    description: "Modèle multimodal de dernière génération, très performant sur de nombreuses tâches.",
    points_forts: "Compréhension contextuelle, rapidité, multimodalité (texte, image, audio)",
    points_faibles: "Coût d'utilisation, parfois trop verbeux",
    site: "https://openai.com/gpt-4o"
  },
  "o3-mini": {
    nom: "o3-mini",
    createur: "OpenAI",
    date: "2024",
    description: "Version compacte et rapide de la série GPT-4, adaptée aux usages légers.",
    points_forts: "Rapidité, faible consommation de ressources",
    points_faibles: "Moins performant sur les tâches complexes",
    site: "https://openai.com"
  },
  "Mistral": {
    nom: "Mistral",
    createur: "Mistral AI",
    date: "2023",
    description: "Modèle open source européen, réputé pour sa performance et sa transparence.",
    points_forts: "Open source, performance, adaptabilité",
    points_faibles: "Moins de données d'entraînement que GPT-4",
    site: "https://mistral.ai"
  },
  "Claude 3.7": {
    nom: "Claude 3.7",
    createur: "Anthropic",
    date: "2024",
    description: "Modèle axé sur la sécurité, l'éthique et la compréhension fine du langage.",
    points_forts: "Sécurité, explications détaillées, gestion des contextes longs",
    points_faibles: "Moins créatif sur certains sujets",
    site: "https://www.anthropic.com"
  },
  "o3mini élevé": {
    nom: "o3mini élevé",
    createur: "OpenAI",
    date: "2024",
    description: "Version plus performante de o3-mini, adaptée à des tâches plus complexes.",
    points_forts: "Rapidité, meilleure compréhension que o3-mini",
    points_faibles: "Moins performant que GPT-4o sur certains points",
    site: "https://openai.com"
  },
  "Llama 3": {
    nom: "Llama 3",
    createur: "Meta AI",
    date: "2024",
    description: "Modèle open source de Meta, très utilisé pour la recherche et l'open innovation.",
    points_forts: "Open source, large communauté, bonnes performances",
    points_faibles: "Moins d'optimisation sur certaines tâches spécialisées",
    site: "https://ai.meta.com/llama/"
  },
  "Command R+": {
    nom: "Command R+",
    createur: "Cohere",
    date: "2024",
    description: "Modèle de Cohere axé sur la compréhension et la génération de texte avancée.",
    points_forts: "Bonne compréhension contextuelle, rapidité",
    points_faibles: "Moins connu, moins de ressources communautaires",
    site: "https://cohere.com"
  },
  "GPT-40 mini": {
    nom: "GPT-40 mini",
    createur: "OpenAI",
    date: "2024",
    description: "Version mini de GPT-4o, optimisée pour la rapidité et l'efficacité.",
    points_forts: "Rapide, léger, facile à intégrer",
    points_faibles: "Moins performant sur les tâches complexes",
    site: "https://openai.com"
  },
  "Command R": {
    nom: "Command R",
    createur: "Cohere",
    date: "2024",
    description: "Version standard de la série Command de Cohere.",
    points_forts: "Bonne gestion du texte, simplicité",
    points_faibles: "Moins de fonctionnalités avancées que Command R+",
    site: "https://cohere.com"
  },
  "Claude 3 Haiku": {
    nom: "Claude 3 Haiku",
    createur: "Anthropic",
    date: "2024",
    description: "Version rapide et légère de Claude 3, pensée pour les usages quotidiens.",
    points_forts: "Rapidité, simplicité, coût réduit",
    points_faibles: "Moins détaillé, moins de profondeur dans les réponses",
    site: "https://www.anthropic.com"
  },
  "Dall E 3": {
    nom: "Dall E 3",
    createur: "OpenAI",
    date: "2023",
    description: "Modèle de génération d'images à partir de texte, très performant pour la créativité visuelle.",
    points_forts: "Créativité, qualité des images, multimodal",
    points_faibles: "Ne gère pas le texte, pas d'usage conversationnel",
    site: "https://openai.com/dall-e-3"
  }
};

function ModeleContent() {
  const params = useSearchParams();
  const nom = params.get("nom") || "";
  const m = modeles[nom];
  return (
    <div style={{ minHeight: "100vh", background: "#eaf6ff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 700, borderRadius: 18, marginTop: 40, marginBottom: 40 }}>
        <a href="/comparatif" style={{ color: "#007bff", textDecoration: "none", fontSize: "1.1em", display: "inline-block", marginBottom: 24 }}>&larr; Retour au comparatif</a>
        <h1 style={{ color: "#2176c1", marginBottom: 18, textAlign: "center" }}>{nom ? `Modèle : ${nom}` : "Modèle IA"}</h1>
        {m ? (
          <div className="modele-info" style={{ background: "#d0e8ff", color: "#1a3557", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,123,255,0.07)", padding: 24, marginBottom: 28 }}>
            <h2 style={{ color: "#2176c1", marginTop: 0 }}>{m.nom}</h2>
            <p><b>Créateur :</b> {m.createur}</p>
            <p><b>Date de création :</b> {m.date}</p>
            <p><b>Description :</b> {m.description}</p>
            <p><b>Points forts :</b> {m.points_forts}</p>
            <p><b>Points faibles :</b> {m.points_faibles}</p>
            <p><b>Site officiel :</b> <a href={m.site} target="_blank" rel="noopener noreferrer" style={{ color: "#2176c1", textDecoration: "underline" }}>{m.site}</a></p>
          </div>
        ) : (
          <div className="not-found" style={{ color: "#c00", textAlign: "center", fontSize: "1.2em", marginTop: 40 }}>
            Aucun modèle trouvé pour : <b>{nom}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModelePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ModeleContent />
    </Suspense>
  );
} 