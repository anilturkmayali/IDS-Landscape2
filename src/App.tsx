import { Component, createResource, For, Show } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>IDSA Landscape</h1>
      <p style={{ fontSize: "1.1rem", color: "#555" }}>
        This is the dummy version based on CNCF Landscape2 structure.
        <br />
        Once your <code>landscape.yml</code> and rendering logic are in place, this page will transform.
      </p>

      <hr style={{ margin: "2rem 0" }} />

      <Show when={landscape()}>
        <For each={landscape()?.landscape}>
          {(category: any) => (
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", color: "#004080" }}>{category.name}</h2>
              <For each={category.subcategories}>
                {(sub: any) => (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", color: "#0066cc" }}>{sub.name}</h3>
                    <ul style={{ listStyle: "none", paddingLeft: 0, display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                      <For each={sub.items}>
                        {(item: any) => (
                          <li style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "1rem",
                            width: "220px",
                            background: "#f9f9f9",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                          }}>
                            <img
                              src={item.logo}
                              alt={item.name}
                              style={{ height: "40px", marginBottom: "0.5rem" }}
                            />
                            <br />
                            <a href={item.homepage_url} target="_blank" rel="noreferrer" style={{ fontWeight: "bold", color: "#333", textDecoration: "none" }}>
                              {item.name}
                            </a>
                            <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>{item.description}</p>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>
                )}
              </For>
            </section>
          )}
        </For>
      </Show>
    </main>
  );
};

export default App;
