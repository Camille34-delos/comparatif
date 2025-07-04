// This file will implement the avis API logic, supporting GET, POST, PATCH, and moyenne endpoints, using avis.json for storage. 

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const AVIS_PATH = path.join(process.cwd(), 'avis.json');

interface Avis {
  avis: string;
  note: number;
  nom: string;
}

async function loadAvis(): Promise<Avis[]> {
  try {
    const data = await fs.readFile(AVIS_PATH, 'utf-8');
    return JSON.parse(data) as Avis[];
  } catch {
    return [];
  }
}

async function saveAvis(avisList: Avis[]): Promise<void> {
  await fs.writeFile(AVIS_PATH, JSON.stringify(avisList, null, 2), 'utf-8');
}

export async function GET() {
  const avisList = await loadAvis();
  // Migration: ensure all avis are objects
  const avisObjs = avisList.map((a: unknown) => {
    if (typeof a === 'object' && a !== null) {
      if ('nom' in a) return a as Avis;
      return { ...(a as object), nom: '' } as Avis;
    }
    return { avis: String(a), note: 0, nom: '' };
  });
  return NextResponse.json(avisObjs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const message = (data.avis || '').trim();
  const note = parseInt(data.note, 10);
  const nom = (data.nom || '').trim();
  if (!nom || nom.length < 2)
    return NextResponse.json({ success: false, error: 'Nom trop court.' }, { status: 400 });
  if (!message || message.length < 3)
    return NextResponse.json({ success: false, error: 'Avis trop court.' }, { status: 400 });
  if (note < 1 || note > 5)
    return NextResponse.json({ success: false, error: 'Note invalide.' }, { status: 400 });
  const avisList = await loadAvis();
  avisList.push({ avis: message, note, nom });
  await saveAvis(avisList);
  return NextResponse.json({ success: true });
}

export async function PATCH() {
  const avisList = await loadAvis();
  if (!avisList.length)
    return NextResponse.json({ success: false, error: 'Aucun avis.' }, { status: 400 });
  if (typeof avisList[avisList.length - 1] === 'object') {
    avisList[avisList.length - 1].note = 5;
  } else {
    avisList[avisList.length - 1] = { avis: String(avisList[avisList.length - 1]), note: 5, nom: '' };
  }
  await saveAvis(avisList);
  return NextResponse.json({ success: true });
}

// Next.js does not natively support subroutes in a single file, so create a separate file for /moyenne if needed. 