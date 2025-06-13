import yaml from "js-yaml";

export async function loadLandscape(): Promise<any> {
  const response = await fetch("/landscape.yml");
  const text = await response.text();
  return yaml.load(text);
}
