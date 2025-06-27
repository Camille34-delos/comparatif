/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    q: "Quel est le nom du modèle IA le plus récent présenté dans le comparatif ?",
    options: ["GPT-4o", "Mistral", "Claude 3.7", "Llama 3"],
    answer: "GPT-4o"
  },
  {
    q: "Quel domaine n'est PAS évalué dans le tableau ?",
    options: ["Maths", "Cuisine", "Histoire", "Médecine"],
    answer: "Cuisine"
  },
  {
    q: "Quelle couleur représente la mention 'Meilleur' dans le graphique ?",
    options: ["Bleu", "Vert", "Jaune", "Rouge"],
    answer: "Bleu"
  },
  {
    q: "Combien de mentions différentes sont affichées dans la carte graphique ?",
    options: ["2", "3", "4", "5"],
    answer: "4"
  },
  {
    q: "Quel modèle est open source européen ?",
    options: ["Mistral", "GPT-4o", "Claude 3.7", "Command R+"],
    answer: "Mistral"
  },
  {
    q: "Quel modèle est développé par Anthropic ?",
    options: ["Claude 3.7", "GPT-4o", "Llama 3", "Dall E3"],
    answer: "Claude 3.7"
  },
  {
    q: "Quel modèle est spécialisé dans la génération d'images ?",
    options: ["Dall E3", "Command R", "Claude 3 Haiku", "o3-mini"],
    answer: "Dall E3"
  },
  {
    q: "Quel modèle est proposé par Meta AI ?",
    options: ["Llama 3", "GPT-4o", "Claude 3.7", "Mistral"],
    answer: "Llama 3"
  },
  {
    q: "Quel modèle a pour point fort la rapidité et la légèreté ?",
    options: ["o3-mini", "Claude 3.7", "Command R+", "Dall E3"],
    answer: "o3-mini"
  },
  {
    q: "Quel bouton permet de revenir à la page de comparatif ?",
    options: ["← Retour au comparatif", "Accueil", "Envoyer", "Quiz"],
    answer: "← Retour au comparatif"
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [showCorrection, setShowCorrection] = useState(false);
  const router = useRouter();

  const score = answers.reduce(
    (acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0),
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#eaf6ff", padding: 0, margin: 0 }}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <button
          onClick={() => router.push("/comparatif")}
          style={{ background: "#2176c1", color: "#fff", border: "none", borderRadius: 10, padding: "10px 32px", fontSize: 20, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px #d0e8ff", marginBottom: 32 }}
        >
          &larr; Retour au comparatif
        </button>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 22, boxShadow: "0 2px 12px #d0e8ff", padding: 40, marginBottom: 48 }}>
        <h1 style={{ color: "#2176c1", fontWeight: 700, fontSize: 38, textAlign: "center", marginBottom: 36, marginTop: 0, lineHeight: 1.1 }}>
          Quiz sur l'IA
        </h1>
        {!showCorrection && (
          <>
            {questions.map((q, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#0a2b4a", marginBottom: 10 }}>
                  {i + 1}. {q.q}
                </div>
                {q.options.map((opt, j) => (
                  <div key={j} style={{ marginBottom: 4, marginLeft: 16 }}>
                    <label style={{ fontSize: 18, color: "#0a2b4a", fontWeight: 400, cursor: "pointer" }}>
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => setAnswers(a => a.map((v, idx) => idx === i ? opt : v))}
                        style={{ marginRight: 8 }}
                      />
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <button
                onClick={() => setShowCorrection(true)}
                style={{ background: "#2176c1", color: "#fff", border: "none", borderRadius: 10, padding: "10px 40px", fontSize: 22, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px #d0e8ff" }}
              >
                Valider
              </button>
            </div>
          </>
        )}
        {showCorrection && (
          <div>
            <div style={{ textAlign: "center", fontWeight: 700, fontSize: 26, color: "#2176c1", margin: "24px 0 18px 0" }}>
              Votre note : {score}/10
            </div>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.answer;
              return (
                <div key={i} style={{ background: "#f1f8fe", borderRadius: 14, padding: 18, marginBottom: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#2176c1", marginBottom: 6 }}>
                    Q{i + 1}. {q.q}
                  </div>
                  <div style={{ fontWeight: 700, color: isCorrect ? "#1bbf3a" : "#e53935", fontSize: 20, marginBottom: 4 }}>
                    {isCorrect ? "Bonne réponse !" : "Faux."}
                  </div>
                  <div style={{ color: "#2176c1", fontWeight: 500, fontSize: 18, marginBottom: 2 }}>
                    Votre réponse : {answers[i] || <span style={{ color: '#888' }}>(aucune)</span>}
                  </div>
                  <div style={{ color: "#2176c1", fontWeight: 500, fontSize: 18 }}>
                    Bonne réponse : {q.answer}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 