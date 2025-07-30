export async function fetchTypes(): Promise<string[]> {
  const types: string[] = [];
  const totalPages = 10; //actually like 30

  for (let page = 0; page < totalPages; page++) {
    const res = await fetch(`https://digi-api.com/api/v1/type?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch page ${page}`);
    const data = await res.json();
    console.log(data);

    types.push(
      ...data.content.fields.map((field: { name: string }) => field.name)
    );
  }

  return types;
}
