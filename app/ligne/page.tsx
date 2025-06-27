"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const tableRows = [
  ["Open AI.png", "GPT-4o", "Intro avec des parties de 3 à 4 lignes avec titres en gras, plus une conclusion", "Résumé en trois parties, titres en gras, seul le personnage principal nommé", "Résout l'équation en détaillant la démarche mais le language n'est pas très claire, réponse à la fin", "Paragraphe avec  nombre de morts (639 selon ONG) et régions frappées", "Histoire de 10 lignes pas très drôle", "Très clair avec titres et dates , environ 20 lignes", "Très clair, structuré sur le fonctionnement et l'utilisation des antibiotiques environ 20 lignes"],
  ["Open AI.png", "o3-mini", "Idem mais titres pas en gras", "Idem mais plus court, avec une partie objectif de Zola", "Beaucoup plus clair, et écrit en language naturel", "Pas de nombre, explication de la difficulté à trouver ses informations", "Histoire d'environ 20 lignes mais pas drôle", "Moins structuré, et moins de dates ", "Même chose que GPT4o"],
  ["Mistral.png", "Mistral", "Idem que o3-mini", "Même chose que GPT-4o", "Résout l'équation mais moins détaillé", "2 lignes avec le nombre de morts (78 selon services iraniens)", "Histoire sous forme de blague, plus drôle qu'avant", "Très court, avec seulement la date de naissance et le club", "Petit paragraphe de seulement 8 lignes"],
  ["Claude.png", "Claude 3.7", "Parties plus longues, bullet points, sources et conséquences à la fin", "Beaucoup plus détaillé, noms de personnages, thèmes listés", "Résout, réponses en valeur approximative et exacte", "Explication très détaillée des frappes israéliennes (raisons, cibles, régions), 639 morts (ONG)", "Histoire très longue, environ 20 lignes copiant l'histoire du lièvre et de la tortue", "Très structuré parcourant tout les domaines ", "Très long, environ 60 lignes"],
  ["Claude.png", "Claude 3 Haiku", "Pas d'intro et phrases très courtes", "Pas de résumé mais intrigue et thème", "Fausses réponses, se trompe dans la factorisation", "Différent point sur la guerre, 78 morts (source iranienne)", "Demande : Quelle serait le contenu de cette mémoire. Puis une histoire pas drôle", "Petit paragraphe bien structuré avec dates", "Explication en Bullet points, environ 20 lignes"],
  ["Llama 3.png", "Llama 3", "petit textes structurés sans conclusion", "Pas de résumé, mais intrigue et conclusion", "Bien détaillé, même chose que Mistral", " Fait la liste des attaques D 'Israël sur l'Iran depuis 2007", "Même chose que GPT-40", " succin avec tout le nécessaire", " petit paragraphe d'environ 10 lignes"],
  ["cohere.png", "Command R+", "Petite phrase de réponse, moins détaillé", "Intrigue, thème et résumé, bien détaillé avec le nom des personnages", "Se trompe dans la résolution de l'équation", "Dis le nombre de morts, sources et dates différentes", "2 histoires entre 10 et 15 lignes, assez drôle", "Petit paragraphe, assez clair environ 20 lignes", "Petit paragraphe, environ 10 lignes"],
  ["cohere.png", "Command R", "Très peu détaillé, seulement 3 parties et pas de conclusion", "Résumé en gros paragraphes + liste personnages", "Trouve 3 sites pour résoudre mais les réponses sont fausses", "Petit paragraphe sur le nombre de morts,", "Environ 10 lignes,un peu plus drôle", "Même chose que Llama", "Paragraphe de seulement 5 lignes"],
  ["Open AI.png", "Dall E3", "Une image sur une charge de cavalier pendant le Moyen-Âge, il dit ce qu'il fait", "Image inventée", "Montre une image illustrant la résolution d'une équation quadratique", "Image inventée de destruction par le feu", "Image d'animaux autour d'un feu mangeant des chamallows", "Image montrant Antoine Dupond en action", "Image montrant le fonctionnement des antibiotiques"]
];

const headers = [
  "Photo", "Modèle", "Histoire", "Français", "Maths", "Actualité", "Histoire drôle", "Personnalité", "Médecine"
];

const chartData = [
  { label: "Meilleur", color: "#2196f3" },
  { label: "Bien", color: "#00c853" },
  { label: "Moyen", color: "#ffeb3b" },
  { label: "Mauvais", color: "#ff5252" }
];

function getClosestModel(name: string) {
  // Simple case-insensitive closest match
  let best = tableRows[0][1];
  let minDist = levenshtein(name.toLowerCase(), best.toLowerCase());
  for (const row of tableRows) {
    const dist = levenshtein(name.toLowerCase(), row[1].toLowerCase());
    if (dist < minDist) {
      minDist = dist;
      best = row[1];
    }
  }
  return best;
}

function levenshtein(a: string, b: string) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const scores: { [key: string]: number[] } = {
  "GPT-4o": [1, 4, 2, 0],
  "o3-mini": [1, 2, 4, 0],
  "Mistral": [0, 3, 3, 1],
  "Claude 3.7": [3, 3, 0, 1],
  "Claude 3 Haiku": [0, 3, 0, 4],
  "Llama 3": [0, 3, 3, 1],
  "Command R+": [2, 2, 2, 1],
  "Command R": [0, 3, 1, 3],
  "Dall E3": [0, 0, 0, 0]
};

export default function LignePage() {
  const params = useSearchParams();
  const nom = params.get("nom") || "";
  const modelName = getClosestModel(nom);
  const row = tableRows.find(r => r[1] === modelName);
  const modelScores = scores[modelName] || [0, 0, 0, 0];

  return (
    <div style={{ minHeight: "100vh", background: "#eaf6ff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 1400, borderRadius: 24, marginTop: 48, marginBottom: 48, background: "#fff", padding: 36, boxShadow: "0 2px 12px #d0e8ff" }}>
        <a href="/comparatif" style={{ color: "#2176c1", textDecoration: "none", fontWeight: 500, fontSize: "1.15em", display: "inline-block", marginBottom: 24 }}>&larr; Retour au comparatif</a>
        <h1 style={{ color: "#2176c1", fontWeight: 700, fontSize: 38, textAlign: "center", marginBottom: 36, marginTop: 0, lineHeight: 1.1 }}>
          Ligne du modèle : {modelName}
        </h1>
        <div style={{ overflowX: "auto", marginBottom: 36 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 19, background: "#fff", borderRadius: 12, overflow: "hidden" }}>
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} style={{ background: "#2196f3", color: "#fff", padding: 14, border: "1px solid #ccc", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {row && (
                <tr style={{ background: "#f9f9f9" }}>
                  <td style={{ textAlign: "center", padding: 12, border: "1px solid #ccc" }}>
                    <Image src={`/${row[0]}`} alt={row[1]} width={56} height={56} style={{ borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px #e0eafc", objectFit: "cover" }} />
                  </td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} style={{ padding: 12, border: "1px solid #ccc", verticalAlign: "top" }}>{cell}</td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center", marginTop: 36, marginBottom: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 24, color: "#2176c1", marginBottom: 18 }}>Appréciations pour ce modèle</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, alignItems: "end", marginBottom: 18 }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 56, height: 90, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: 56, height: 22 * modelScores[i], background: d.color, borderRadius: 8, transition: "height 0.3s" }}></div>
                </div>
                <div style={{ fontWeight: 600, color: "#222", marginTop: 8 }}>{d.label}</div>
                <div style={{ color: "#2176c1", fontWeight: 700, fontSize: 20 }}>{modelScores[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 