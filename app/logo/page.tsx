/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface LogoInfo {
  name: string;
  img: string;
  who: string;
  ia: string;
  date: string;
  signification: string;
}

const logoData: Record<string, LogoInfo> = {
  "Claude": {
    name: "Claude (Anthropic)",
    img: "/Claude.png",
    who: "Claude est la famille de modèles d'IA développée par Anthropic, une entreprise américaine fondée en 2021 par d'anciens membres d'OpenAI.",
    ia: "Claude 1, Claude 2, Claude 3 (Haiku, Sonnet, Opus)",
    date: "Logo utilisé depuis 2023",
    signification: "Le logo stylisé évoque la simplicité, la sécurité et l'accessibilité, valeurs centrales d'Anthropic pour une IA responsable."
  },
  "Mistral": {
    name: "Mistral AI",
    img: "/Mistral.png",
    who: "Mistral AI est une entreprise européenne spécialisée dans les modèles d'IA open source, fondée en 2023 à Paris.",
    ia: "Mistral 7B, Mistral 8x7B, Mixtral 8x22B, Mistral Large",
    date: "Logo utilisé depuis 2023",
    signification: "Le logo évoque le vent du sud de la France, symbole de fraîcheur, de rapidité et d'innovation."
  },
  "OpenAI": {
    name: "OpenAI",
    img: "/Open AI.png",
    who: "OpenAI est une entreprise américaine fondée en 2015, pionnière dans le développement de l'intelligence artificielle générale (AGI).",
    ia: "GPT-3, GPT-3.5, GPT-4, GPT-4o, DALL·E, Whisper",
    date: "Logo utilisé depuis 2022",
    signification: "Le logo symbolise la collaboration, la sécurité et l'ouverture, valeurs clés d'OpenAI."
  },
  "Llama 3": {
    name: "Llama (Meta AI)",
    img: "/Llama 3.png",
    who: "Llama est la famille de modèles d'IA open source développée par Meta AI (Facebook).",
    ia: "Llama 1, Llama 2, Llama 3",
    date: "Logo utilisé depuis 2023",
    signification: "Le logo représente une tête de lama stylisée, symbole d'accessibilité et d'ouverture à la communauté."
  },
  "Cohere": {
    name: "Cohere",
    img: "/cohere.png",
    who: "Cohere est une entreprise canadienne spécialisée dans les modèles de langage pour les entreprises.",
    ia: "Command R, Command R+",
    date: "Logo utilisé depuis 2021",
    signification: "Le logo évoque la connexion et la cohésion, valeurs essentielles pour l'IA d'entreprise."
  }
};

function LogoContent() {
  const params = useSearchParams();
  const nom = params.get("nom") || "";
  const data = logoData[nom] || logoData["Claude"];

  return (
    <div style={{ minHeight: "100vh", background: "#eaf6ff", padding: 0, margin: 0 }}>
      <div className="container" style={{ maxWidth: 700, borderRadius: 24, marginTop: 48, marginBottom: 48, background: "#fff", padding: 36, boxShadow: "0 2px 12px #d0e8ff" }}>
        <a href="/comparatif" style={{ color: "#2176c1", textDecoration: "none", fontWeight: 500, fontSize: "1.15em", display: "inline-block", marginBottom: 24 }}>&larr; Retour au comparatif</a>
        <h1 style={{ color: "#2176c1", fontWeight: 700, fontSize: 38, textAlign: "center", marginBottom: 18, marginTop: 0, lineHeight: 1.1 }}>
          {data.name}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Image src={data.img} alt={data.name} width={110} height={110} style={{ borderRadius: "50%", background: "#e0d6cd", objectFit: "cover" }} />
        </div>
        <div style={{ color: "#2176c1", fontWeight: 600, fontSize: 22, textAlign: "center", marginBottom: 18 }}>{data.name}</div>
        <div style={{ color: "#0a2b4a", fontSize: 18, marginBottom: 10 }}><b>Qui ?</b> {data.who}</div>
        <div style={{ color: "#0a2b4a", fontSize: 18, marginBottom: 10 }}><b>IA mises en service :</b> {data.ia}</div>
        <div style={{ color: "#0a2b4a", fontSize: 18, marginBottom: 10 }}><b>Date du logo :</b> {data.date}</div>
        <div style={{ color: "#0a2b4a", fontSize: 18, marginBottom: 0 }}><b>Signification du logo :</b> {data.signification}</div>
      </div>
    </div>
  );
}

export default function LogoPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LogoContent />
    </Suspense>
  );
} 