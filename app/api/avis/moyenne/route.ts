import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const AVIS_PATH = path.join(process.cwd(), 'avis.json');

async function loadAvis() {
  try {
    const data = await fs.readFile(AVIS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  const avisList = await loadAvis();
  const notes = avisList.filter((a: any) => typeof a === 'object' && 'note' in a).map((a: any) => a.note);
  if (!notes.length) return NextResponse.json({ moyenne: 0, nb: 0 });
  const moyenne = notes.reduce((a: number, b: number) => a + b, 0) / notes.length;
  return NextResponse.json({ moyenne: Math.round(moyenne * 100) / 100, nb: notes.length });
} 