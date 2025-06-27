import { NextResponse } from 'next/server';
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

export async function GET() {
  const avisList = await loadAvis();
  const notes = avisList.filter((a: Avis) => typeof a === 'object' && 'note' in a).map((a: Avis) => a.note);
  if (!notes.length) return NextResponse.json({ moyenne: 0, nb: 0 });
  const moyenne = notes.reduce((a: number, b: number) => a + b, 0) / notes.length;
  return NextResponse.json({ moyenne: Math.round(moyenne * 100) / 100, nb: notes.length });
} 