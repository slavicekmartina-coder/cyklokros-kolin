
const DATA_URL = 'https://script.google.com/macros/s/AKfycbzHPn4ODfHZCU0f9ZhgQD3raZIOqFnYz2j0FwWM8tNfLH99wAOjMyGH9lJNxXsBAc02/exec';

export async function onRequestGet() {
  try {
    const response = await fetch(DATA_URL, {
      redirect: 'follow',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Chyba načítání dat:', error);

    return new Response(JSON.stringify({
      error: 'Data se nepodařilo načíst.'
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
}
