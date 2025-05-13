async function fetchResources() {
//https://pokeapi.co/api/v2/pokemon/ditto
//https://seshatbe.up.railway.app/resources
    try {
    const data = await fetch("https://seshatbe.up.railway.app/resources", {
      method: "GET"
    });
    console.log(await data.json());
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchTags() {
  try {
    const data = await fetch("https://seshatbe.up.railway.app/tags", {
      method: "GET"
    });
    console.log(await data.json());
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchResources, fetchTags };
