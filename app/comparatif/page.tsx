"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Chart from "chart.js/auto";
import { useRouter } from "next/navigation";
import levenshtein from "fast-levenshtein";

const labels = [
  "GPT-40", "o3-mini", "Mistral", "Claude 3.7", "o3mini élevé", "Llama 3", "Command R+", "GPT-40 mini", "Command R", "Claude 3 Haiku", "Dall E 3"
];
const meilleur = [1, 1, 0, 3, 0, 0, 2, 0, 0, 0, 0];
const bien = [4, 2, 3, 3, 4, 3, 2, 5, 3, 3, 0];
const moyen = [2, 4, 3, 0, 3, 3, 2, 2, 1, 0, 0];
const mauvais = [0, 0, 1, 1, 0, 1, 1, 0, 3, 4, 0];

const chartData = {
  labels,
  datasets: [
    { label: "Meilleur", data: meilleur, backgroundColor: "rgba(52, 152, 219, 0.9)" },
    { label: "Bien", data: bien, backgroundColor: "rgba(46, 204, 113, 0.8)" },
    { label: "Moyen", data: moyen, backgroundColor: "rgba(241, 196, 15, 0.8)" },
    { label: "Mauvais", data: mauvais, backgroundColor: "rgba(231, 76, 60, 0.8)" }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: "Appréciations par IA (Bien, Moyen, Mauvais, Meilleur)" }
  },
  scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
};

const logoMap: Record<string, string> = {
  "Open AI.png": "/Open AI.png",
  "Mistral.png": "/Mistral.png",
  "Llama 3.png": "/Llama 3.png",
  "cohere.png": "/cohere.png",
  "Claude.png": "/Claude.png"
};

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

const logos = [
  { src: "/Open AI.png", alt: "OpenAI" },
  { src: "/Mistral.png", alt: "Mistral" },
  { src: "/Claude.png", alt: "Claude" },
  { src: "/Llama 3.png", alt: "Llama 3" },
  { src: "/cohere.png", alt: "Cohere" },
];

const headers = [
  "Photo", "Modèle", "Histoire", "Français", "Maths", "Actualité", "Histoire drôle", "Personnalité", "Médecine"
];

const modelNames = [
  "GPT-4o",
  "o3-mini",
  "Mistral",
  "Claude 3.7",
  "o3mini élevé",
  "Llama 3",
  "Command R+",
  "GPT-40 mini",
  "Command R",
  "Claude 3 Haiku",
  "Dall E 3"
];

function AvisSection() {
  const [avis, setAvis] = useState([]);
  const [moyenne, setMoyenne] = useState<{ moyenne: number; nb: number }>({ moyenne: 0, nb: 0 });
  const [showAll, setShowAll] = useState(false);
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/avis")
      .then((r) => r.json())
      .then(setAvis);
    fetch("/api/avis/moyenne")
      .then((r) => r.json())
      .then(setMoyenne);
  }, []);

  const handleSubmit = async () => {
    if (nom.length < 2) return setError("Merci de saisir votre nom (au moins 2 caractères).");
    if (message.length < 3) return setError("Merci de saisir un avis plus long.");
    if (note < 1 || note > 5) return setError("Merci de sélectionner une note entre 1 et 5 étoiles.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avis: message, note, nom })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("");
        setNom("");
        setNote(0);
        setShowAll(false);
        fetch("/api/avis").then((r) => r.json()).then(setAvis);
        fetch("/api/avis/moyenne").then((r) => r.json()).then(setMoyenne);
      } else {
        setError(data.error || "Erreur lors de l'envoi de l'avis.");
      }
    } catch {
      setError("Erreur de connexion au serveur d'avis.");
    }
    setLoading(false);
  };

  const avisToShow = showAll ? avis : avis.slice(0, 3);
  return (
    <div id="avis-section" className="mt-16 bg-[#f8faff] rounded-[14px] shadow-lg p-8 max-w-xl mx-auto">
      <h2 className="text-[#007bff] text-xl font-bold mb-4">Donnez votre avis</h2>
      <div className="flex mb-2 text-2xl">
        {[1,2,3,4,5].map((i) => (
          <span
            key={i}
            className={
              "cursor-pointer transition-colors " +
              (note >= i ? "text-yellow-400" : "text-[#cce0ff]")
            }
            onClick={() => setNote(i)}
          >★</span>
        ))}
      </div>
      <input
        className="w-full mb-2 rounded-lg border border-[#cce0ff] p-2 text-base"
        placeholder="Votre nom"
        maxLength={40}
        value={nom}
        onChange={e => setNom(e.target.value)}
      />
      <textarea
        className="w-full min-h-[60px] rounded-lg border border-[#cce0ff] p-2 text-base mb-2"
        placeholder="Votre avis..."
        maxLength={300}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white rounded-lg px-7 py-2 font-semibold mb-3 disabled:opacity-60"
        onClick={handleSubmit}
        disabled={loading}
      >Envoyer l'avis</button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2">
        <b>Moyenne des avis :</b> <span className="text-yellow-400 font-bold">{'★'.repeat(Math.round(moyenne.moyenne))}{'☆'.repeat(5-Math.round(moyenne.moyenne))}</span> <span className="text-[#007bff] font-semibold">{moyenne.moyenne} / 5</span> <span className="text-gray-500">({moyenne.nb} avis)</span>
      </div>
      <div>
        {avisToShow.map((a: any, idx: number) => (
          <div key={idx} className="bg-[#eaf4ff] rounded-lg p-3 mb-2 text-[#2d3a4b] text-base shadow">
            <span className="text-yellow-400">{'★'.repeat(a.note)}{'☆'.repeat(5-a.note)}</span><br/>
            <span className="text-[#007bff] font-semibold">{a.nom}</span><br/>{a.avis}
          </div>
        ))}
      </div>
      {avis.length > 3 && (
        <button className="bg-[#eaf4ff] text-[#007bff] rounded-lg px-6 py-2 mt-2" onClick={() => setShowAll(v => !v)}>
          {showAll ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
}

export default function Comparatif() {
  const [search, setSearch] = useState("");
  const [ligneSearch, setLigneSearch] = useState("");
  const router = useRouter();
  const filteredRows = tableRows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    const ctx = document.getElementById("iaChart") as HTMLCanvasElement;
    if (ctx && !ctx.dataset.chartRendered) {
      new Chart(ctx, { type: "bar", data: chartData, options: chartOptions });
      ctx.dataset.chartRendered = "true";
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f4faff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 1200, borderRadius: 18, marginTop: 40, marginBottom: 40, padding: 32 }}>
        <a href="/" style={{ color: "#007bff", textDecoration: "none", fontSize: "1.1em", display: "inline-block", marginBottom: 24 }}>&larr; Retour à l'accueil</a>
        <h1 style={{ textAlign: "center", color: "#222", fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Comparatif des modèles d'IA (Délos 6)</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24 }}>
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={70}
              height={70}
              style={{ borderRadius: "50%", background: "#fff", boxShadow: "0 2px 12px #d0e8ff", objectFit: "cover", cursor: "pointer" }}
              onClick={() => router.push(`/logo?nom=${encodeURIComponent(logo.alt)}`)}
            />
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (search.trim()) {
              const input = search.trim();
              // Find closest model name (case-insensitive)
              let best = modelNames[0];
              let minDist = levenshtein.get(input.toLowerCase(), best.toLowerCase());
              for (const name of modelNames) {
                const dist = levenshtein.get(input.toLowerCase(), name.toLowerCase());
                if (dist < minDist) {
                  minDist = dist;
                  best = name;
                }
              }
              router.push(`/infos?nom=${encodeURIComponent(best)}`);
            }
          }}
          style={{ width: "100%", maxWidth: 600, margin: "0 auto 24px auto", display: "flex", gap: 0 }}
        >
          <input
            type="text"
            placeholder="Recherche avancée : tapez un modèle pour voir toutes ses particularités..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: 12, borderRadius: "8px 0 0 8px", border: "1.5px solid #007bff", fontSize: 18, boxSizing: "border-box", outline: "none" }}
          />
          <button
            type="submit"
            style={{ background: "#2176c1", color: "#fff", border: "none", borderRadius: "0 8px 8px 0", padding: "0 28px", fontSize: "1.15em", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px #d0e8ff", transition: "background 0.2s", height: 48 }}
          >
            Recherche avancée
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ color: "#1a3557", fontSize: "1.13em", textAlign: "center", maxWidth: 900 }}>
            L'intelligence artificielle (IA) révolutionne de nombreux domaines, de l'éducation à la santé, en passant par la recherche et la vie quotidienne. Elle permet d'automatiser des tâches, d'analyser de grandes quantités de données, d'aider à la prise de décision et de proposer des solutions innovantes. Ce comparatif vous aide à mieux comprendre les atouts de chaque modèle d'IA pour choisir celui qui correspond le mieux à vos besoins.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Afficher la ligne d'un modèle (ex: Claude 3.7)"
            value={ligneSearch}
            onChange={e => setLigneSearch(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1.5px solid #007bff", fontSize: 16, width: 280 }}
          />
          <button
            style={{ background: "#2176c1", color: "#fff", border: "none", borderRadius: 8, padding: "8px 22px", fontSize: "1em", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px #d0e8ff", transition: "background 0.2s" }}
            onClick={() => {
              if (ligneSearch.trim()) router.push(`/ligne?nom=${encodeURIComponent(ligneSearch.trim())}`);
            }}
          >
            Voir la ligne
          </button>
          <button
            style={{ background: "#2176c1", color: "#fff", border: "none", borderRadius: 8, padding: "8px 32px", fontSize: "1em", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px #d0e8ff", transition: "background 0.2s", marginLeft: 16 }}
            onClick={() => router.push("/quiz")}
          >
            Quiz
          </button>
        </div>
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
              {filteredRows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td style={{ textAlign: "center", padding: 12, border: "1px solid #ccc" }}>
                    <Image src={`/${row[0]}`} alt={row[1]} width={48} height={48} style={{ borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px #e0eafc", objectFit: "cover" }} />
                  </td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} style={{ padding: 12, border: "1px solid #ccc", verticalAlign: "top" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <canvas id="iaChart" width={900} height={400} className="mt-10"></canvas>
      <div className="mt-10 text-base bg-[#f8f9fa] rounded-lg p-5">
        <b>En résumé :</b><br />
        Le tableau et le graphique ci-dessus illustrent la diversité des performances des modèles d'IA selon les tâches scolaires évaluées.<br />
        On observe que GPT-40, Claude 3.7 et Command R+ se distinguent par leur polyvalence et leur qualité globale élevée, certains étant même considérés comme les meilleurs sur plusieurs tâches.<br />
        À l'inverse, d'autres modèles, comme Claude 3 Haiku et Command R, rencontrent davantage de difficultés ou de limites sur certains exercices, ce qui se traduit par des résultats plus contrastés.<br />
        Les modèles dits « mini », comme o3-mini et GPT-40 mini, affichent des performances correctes ou moyennes, mais ils sont rarement mis en avant comme les meilleurs dans une catégorie.<br />
        Le graphique met en évidence la diversité des profils : certains IA, comme Claude 3.7, sont très homogènes et performants sur l'ensemble des tâches, tandis que d'autres présentent des résultats très variables selon les domaines.<br />
        Cette visualisation permet de repérer rapidement les IA les plus adaptées à des besoins spécifiques, en fonction de leur régularité ou de leur spécialisation.<br />
        En conclusion, ce comparatif offre une vue synthétique et objective pour mieux orienter l'utilisation des IA selon les attentes et les contextes d'usage.<br />
      </div>
      <AvisSection />
    </div>
  );
} 