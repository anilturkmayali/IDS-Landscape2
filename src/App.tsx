import { Component, createResource, For, Show } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main style={{
      fontFamily: "'Segoe UI', sans-serif",
      padding: "2rem",
      background: "#f5f7fa"
    }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img src="/hosted_logos/idsa.svg" alt="IDSA" style={{ height: "60px", marginBottom: "1rem" }} />
        <h1 style={{ fontSize: "2.5rem", color: "#333" }}>IDSA Landscape</h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>Ecosystem inspired by CNCF Landscape2</p>
      </header>

      <Show when={landscape()}>
        <For each={landscape()?.landscape}>
          {(category: any) => (
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", borderBottom: "2px solid #ccc", paddingBottom: "0.5rem", color: "#004080" }}>
                {category.name}
              </h2>

              <For each={category.subcategories}>
                {(sub: any) => (
                  <div style={{ marginTop: "2rem" }}>
                    <h3 style={{ fontSize: "1.4rem", color: "#0066cc" }}>{sub.name}</h3>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: "1.5rem",
                      marginTop: "1rem"
                    }}>
                      <For each={sub.items}>
                        {(item: any) => (
                          <div style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "1rem",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                          }}>
                            <img
                              src={`/${item.logo}`}
                              alt={item.name}
                              style={{ maxHeight: "40px", marginBottom: "0.75rem" }}
                            />
                            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", color: "#333" }}>
                              <a href={item.homepage_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#004080" }}>
                                {item.name}
                              </a>
                            </h4>
                            <p style={{ fontSize: "0.9rem", color: "#555" }}>
                              {item.description || "No description provided."}
                            </p>
                          </div>
                        )}
                      </For>
                    </div>
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
