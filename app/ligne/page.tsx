/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Chart from "chart.js/auto";

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

const chartData = {
  labels: ["Histoire", "Français", "Maths", "Actualité", "Histoire drôle", "Personnalité", "Médecine"],
  datasets: [{
    label: "Performance",
    data: [3, 4, 2, 3, 3, 4, 3],
    backgroundColor: "rgba(52, 152, 219, 0.8)",
    borderColor: "rgba(52, 152, 219, 1)",
    borderWidth: 2
  }]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: "Performance par domaine" }
  },
  scales: {
    y: { beginAtZero: true, max: 5 }
  }
};

function LigneContent() {
  const params = useSearchParams();
  const nom = params.get("nom") || "";
  const row = tableRows.find(row => row[1].toLowerCase().includes(nom.toLowerCase()));
  
  React.useEffect(() => {
    if (row) {
      const ctx = document.getElementById("ligneChart") as HTMLCanvasElement;
      if (ctx && !ctx.dataset.chartRendered) {
        new Chart(ctx, { type: "bar", data: chartData, options: chartOptions });
        ctx.dataset.chartRendered = "true";
      }
    }
  }, [row]);

  return (
    <div style={{ minHeight: "100vh", background: "#f4faff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 1200, borderRadius: 18, marginTop: 40, marginBottom: 40, padding: 32 }}>
        <a href="/comparatif" style={{ color: "#007bff", textDecoration: "none", fontSize: "1.1em", display: "inline-block", marginBottom: 24 }}>&larr; Retour au comparatif</a>
        <h1 style={{ textAlign: "center", color: "#222", fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Ligne du modèle : {nom}</h1>
        {row ? (
          <div>
            <div style={{ overflowX: "auto", marginBottom: 32 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 17, background: "#fff", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} style={{ background: "#007bff", color: "#fff", padding: 14, border: "1px solid #ccc", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "#e6f3ff" }}>
                    <td style={{ textAlign: "center", padding: 12, border: "1px solid #ccc" }}>
                      <Image src={`/${row[0]}`} alt={row[1]} width={48} height={48} style={{ borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px #e0eafc", objectFit: "cover" }} />
                    </td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} style={{ padding: 12, border: "1px solid #ccc", verticalAlign: "top" }}>{cell}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <canvas id="ligneChart" width={800} height={400} className="mt-8"></canvas>
          </div>
        ) : (
          <div style={{ color: "#c00", textAlign: "center", fontSize: "1.2em", marginTop: 40 }}>
            Aucun modèle trouvé pour : <b>{nom}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LignePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LigneContent />
    </Suspense>
  );
} 