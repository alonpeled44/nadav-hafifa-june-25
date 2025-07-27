export async function fetchTypes() {
  const types = [];
  const totalPages = 10; //actually like 30

  for (let page = 0; page < totalPages; page++) {
    const res = await fetch(`https://digi-api.com/api/v1/type?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch page ${page}`);
    const data = await res.json();

    types.push(...data.content.fields.map((field) => field.name));
  }
  
  return types;
}
