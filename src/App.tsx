import { Component, createResource, For, Show } from "solid-js";
import { loadLandscape } from "./utils/loadLandscape";

const App: Component = () => {
  const [landscape] = createResource(loadLandscape);

  return (
    <main class="container py-5">
      {/* Header */}
      <header class="text-center mb-5">
        <img
          src="/hosted_logos/idsa.svg"
          alt="IDSA Logo"
          class="mb-3"
          style={{ height: "40px", objectFit: "contain" }}
        />
        <h1 class="display-4">IDSA Landscape</h1>
        <p class="lead text-muted">
          CNCF-style directory of data space technologies and organizations
        </p>
      </header>

      {/* Dynamic Sections */}
      <Show when={landscape()}>
        <For each={landscape()!.landscape}>
          {(cat: any) => (
            <section class="mb-5">
              <h2 class="h3 text-primary mb-4">{cat.name}</h2>

              <For each={cat.subcategories}>
                {(sub: any) => (
                  <div class="mb-4">
                    <h3 class="h5 text-info mb-3">{sub.name}</h3>

                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                      <For each={sub.items}>
                        {(item: any) => (
                          <div class="col">
                            <div class="card h-100 border-0 shadow-sm position-relative">
                              <div class="card-body text-center">
                                <img
                                  src={`/${item.logo}`}
                                  alt={item.name}
                                  class="img-fluid mb-2"
                                  style={{ maxHeight: "48px" }}
                                />
                                <h6 class="card-title">
                                  <a
                                    href={item.homepage_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    class="stretched-link text-decoration-none text-dark"
                                  >
                                    {item.name}
                                  </a>
                                </h6>
                              </div>
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
