import { Component, createResource, For, Show } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f8fafc",
        padding: "2rem",
        color: "#333"
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img
          src="/hosted_logos/idsa.svg"
          alt="IDSA Logo"
          style={{
            height: "48px",
            objectFit: "contain",
            marginBottom: "1rem"
          }}
        />
        <h1 style={{ fontSize: "2.4rem" }}>IDSA Landscape</h1>
        <p style={{ fontSize: "1rem", color: "#555" }}>
          CNCF-style directory of data space technologies and organizations
        </p>
      </header>

      <Show when={landscape()}>
        <For each={landscape()?.landscape}>
          {(category: any) => (
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#0b4f6c",
                  marginBottom: "1rem"
                }}
              >
                {category.name}
              </h2>

              <For each={category.subcategories}>
                {(sub: any) => (
                  <div style={{ marginBottom: "2rem" }}>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        color: "#1c6ea4",
                        marginBottom: "1rem"
                      }}
                    >
                      {sub.name}
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        gap: "1.2rem"
                      }}
                    >
                      <For each={sub.items}>
                        {(item: any) => (
                          <div
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              padding: "1rem",
                              textAlign: "center",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                              transition: "transform 0.2s",
                              border: "1px solid #e5e7eb"
                            }}
                          >
                            <img
                              src={item.logo}
                              alt={item.name}
                              style={{
                                height: "40px",
                                width: "auto",
                                marginBottom: "10px",
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
                                  fontWeight: "600",
                                  fontSize: "0.95rem",
                                  display: "block",
                                  marginTop: "0.5rem"
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
