"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const modeles: Record<string, any> = {
  "GPT-4o": {
    photo: "/Open AI.png",
    histoire: "Intro avec des parties de 3 à 4 lignes avec titres en gras, plus une conclusion",
    francais: "Résumé en trois parties, titres en gras, seul le personnage principal nommé",
    maths: "Résout l'équation en détaillant la démarche mais le language n'est pas très claire, réponse à la fin",
    actualite: "Paragraphe avec  nombre de morts (639 selon ONG) et régions frappées",
    drole: "Histoire de 10 lignes pas très drôle",
    personnalite: "Très clair avec titres et dates , environ 20 lignes",
    medecine: "Très clair, structuré sur le fonctionnement et l'utilisation des antibiotiques environ 20 lignes"
  },
  "o3-mini": {
    photo: "/Open AI.png",
    histoire: "Idem mais titres pas en gras",
    francais: "Idem mais plus court, avec une partie objectif de Zola",
    maths: "Beaucoup plus clair, et écrit en language naturel",
    actualite: "Pas de nombre, explication de la difficulté à trouver ses informations",
    drole: "Histoire d'environ 20 lignes mais pas drôle",
    personnalite: "Moins structuré, et moins de dates ",
    medecine: "Même chose que GPT4o"
  },
  "Mistral": {
    photo: "/Mistral.png",
    histoire: "Idem que o3-mini",
    francais: "Même chose que GPT-4o",
    maths: "Résout l'équation mais moins détaillé",
    actualite: "2 lignes avec le nombre de morts (78 selon services iraniens)",
    drole: "Histoire sous forme de blague, plus drôle qu'avant",
    personnalite: "Très court, avec seulement la date de naissance et le club",
    medecine: "Petit paragraphe de seulement 8 lignes"
  },
  "Claude 3.7": {
    photo: "/Claude.png",
    histoire: "Parties plus longues, bullet points, sources et conséquences à la fin",
    francais: "Beaucoup plus détaillé, noms de personnages, thèmes listés",
    maths: "Résout, réponses en valeur approximative et exacte",
    actualite: "Explication détaillée des frappes israéliennes (raisons, cibles, régions), 639 morts (ONG)",
    drole: "Histoire très longue, environ 60 lignes",
    personnalite: "Très structuré, beaucoup d'explications",
    medecine: "Très long, environ 60 lignes"
  },
  // Ajoutez d'autres modèles ici si besoin
};

export default function ModelePage() {
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
            <Image src={m.photo} alt={nom} width={64} height={64} style={{ objectFit: "cover", borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "2px solid #e0eafc", display: "block", margin: "0 auto 18px auto" }} />
            <h2 style={{ color: "#2176c1", marginTop: 0 }}>{nom}</h2>
            <p><b>Histoire :</b> {m.histoire}</p>
            <p><b>Français :</b> {m.francais}</p>
            <p><b>Maths :</b> {m.maths}</p>
            <p><b>Actualité :</b> {m.actualite}</p>
            <p><b>Histoire drôle :</b> {m.drole}</p>
            <p><b>Personnalité :</b> {m.personnalite}</p>
            <p><b>Médecine :</b> {m.medecine}</p>
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