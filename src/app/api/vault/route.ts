import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data.json');

// Helper to get initial data (same as store defaults)
const getInitialData = () => {
  return {
    items: [
      { id: '1', name: 'Burger',   price: 45, category: 'Food' },
      { id: '2', name: 'Pizza',    price: 80, category: 'Food' },
      { id: '3', name: 'Shawarma', price: 35, category: 'Food' },
      { id: '4', name: 'Fries',    price: 20, category: 'Sides' },
      { id: '5', name: 'Cola',     price: 15, category: 'Drinks' },
      { id: '6', name: 'Water',    price: 8,  category: 'Drinks' },
      { id: '7', name: 'Juice',    price: 18, category: 'Drinks' },
    ],
    categories: ['Food', 'Drinks', 'Sides'],
    deliveryMen: [
      { id: 'd1', name: 'Ahmed Hassan' },
      { id: 'd2', name: 'Mohamed Ali' },
    ],
    orders: [],
    credentials: [],
    history: [],
    settings: {
      showpass: false,
      confirmdelete: true,
      rowsperpage: 25,
      historyretention: 30,
      historylimit: 200,
      theme: 'light',
    },
  };
};

export async function GET() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      const initial = getInitialData();
      fs.writeFileSync(DATA_PATH, JSON.stringify(initial, null, 2));
      return NextResponse.json(initial);
    }
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
