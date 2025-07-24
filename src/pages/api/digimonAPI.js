export async function fetchDigimon(id) {
  const res = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");

  const data = await res.json();

  return data;
}
