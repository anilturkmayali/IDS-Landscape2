import { Component, createResource, For } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>IDSA Landscape</h1>
      <p>This is the dummy version based on CNCF Landscape2 structure.</p>
      <p>Once your <code>landscape.yml</code> and rendering logic are in place, this page will transform.</p>

      <hr />

      <Show when={landscape()}>
        <For each={landscape()?.landscape}>
          {(category: any) => (
            <section style={{ marginBottom: "2rem" }}>
              <h2>{category.name}</h2>
              <ul>
                <For each={category.subcategories}>
                  {(sub: any) => (
                    <>
                      <h3>{sub.name}</h3>
                      <ul>
                        <For each={sub.items}>
                          {(item: any) => (
                            <li>
                              <img
                                src={item.logo}
                                alt={item.name}
                                style={{ height: "30px", verticalAlign: "middle", marginRight: "10px" }}
                              />
                              <a href={item.homepage_url} target="_blank" rel="noreferrer">
                                {item.name}
                              </a>
                            </li>
                          )}
                        </For>
                      </ul>
                    </>
                  )}
                </For>
              </ul>
            </section>
          )}
        </For>
      </Show>
    </main>
  );
};

export default App;
