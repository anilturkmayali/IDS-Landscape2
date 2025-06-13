import { Component, createResource, For, Show } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main style={{
      fontFamily: "'Segoe UI', sans-serif",
      background: "#f8fafc",
      padding: "2rem"
    }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img
          src="/hosted_logos/idsa.svg"
          alt="IDSA Logo"
          style={{
            maxHeight: "48px",
            objectFit: "contain",
            marginBottom: "1rem"
          }}
        />
        <h1 style={{ fontSize: "2.4rem", color: "#333" }}>IDSA Landscape</h1>
        <p style={{ fontSize: "1rem", color: "#555" }}>
          CNCF-style directory of data space technologies and organizations
        </p>
      </header>

      <Show when={landscape()}>
        <For each={landscape()?.landscape}>
          {(category: any) => (
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{
                fontSize: "1.8rem",
                color: "#0b4f6c",
                marginBottom: "1rem"
              }}>{category.name}</h2>

              <For each={category.subcategories}>
                {(sub: any) => (
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{
                      fontSize: "1.3rem",
                      color: "#1c6ea4",
                      marginBottom: "1rem"
                    }}>{sub.name}</h3>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "1.5rem"
                    }}>
                      <For each={sub.items}>
                        {(item: any) => (
                          <div style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            padding: "1rem",
                            textAlign: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            transition: "transform 0.2s",
                          }}>
                            <img
                              src={`/${item.logo}`}
                              alt={item.name}
                              style={{
                                maxHeight: "50px",
                                maxWidth: "100%",
                                marginBottom: "0.75rem",
                                objectFit: "contain"
                              }}
                            />
                            <div>
                              <a
                                href={item.homepage_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  textDecoration: "none",
                                  color: "#0b4f6c",
                                  fontWeight: "bold",
                                  fontSize: "0.95rem"
                                }}
                              >
                                {item.name}
                              </a>
                            </div>
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
