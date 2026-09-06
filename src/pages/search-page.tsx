import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProfiles } from "../api/search-api";
import ResultCard from "../components/result-card";
import AutocompleteInput from "../components/autocomplete-input";

export default function SearchPage() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState({
    q: "",
    skill: "",
    job_title: "",
  });

  const [submitted, setSubmitted] = useState(filters);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["search", submitted, page],
    queryFn: () => searchProfiles({ ...submitted, page }),
    retry: 1,
  });

  function updateFilter(key: keyof typeof filters, value: string) {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  }

  function focusSearch() {
    searchInputRef.current?.focus();
  }

  function closeDrawer() {
    setDrawerOpen(false);
    focusSearch();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSubmitted(filters);
    closeDrawer();
  }

  function clearFilters() {
    const emptyFilters = {
      q: "",
      skill: "",
      job_title: "",
    };

    setFilters(emptyFilters);
    setPage(1);
    setSubmitted(emptyFilters);
    closeDrawer();
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">LinkedIn Search</h1>

      <form onSubmit={submit}>
        {/* Search */}

        <div className="flex gap-2">
          <div className="w-full flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              autoFocus
              ref={searchInputRef}
              className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              placeholder="Search..."
              value={filters.q}
              onChange={(e) => updateFilter("q", e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="
              rounded-lg
              border
              px-4
              whitespace-nowrap
            "
          >
            Filters
          </button>
        </div>

        {/* Drawer overlay */}

        {drawerOpen && (
          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/40
            "
            onClick={() => {
              closeDrawer();
            }}
          >
            {/* Drawer */}

            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-full
                max-w-sm
                bg-white
                p-6
                shadow-xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>

                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                  }}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <AutocompleteInput
                  label="Skill"
                  field="skills"
                  value={filters.skill}
                  onSelect={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      skill: value,
                    }))
                  }
                />

                <AutocompleteInput
                  label="Job title"
                  field="job_title"
                  value={filters.job_title}
                  onSelect={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      job_title: value,
                    }))
                  }
                />

                <button
                  type="submit"
                  disabled={isFetching}
                  className="
                    w-full
                    rounded-lg
                    bg-black
                    px-5
                    py-3
                    text-white
                    disabled:opacity-50
                  "
                >
                  {isFetching ? "Searching..." : "Apply filters"}
                </button>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    w-full
                    rounded-lg
                    border
                    px-5
                    py-3
                  "
                >
                  Clear filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}

        <section className="mt-8">
          {isLoading && (
            <div className="rounded-lg border p-5 text-center">
              Loading results...
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-red-400 bg-red-50 p-5">
              <h2 className="font-semibold text-red-700">
                Failed to load results
              </h2>

              <p className="mt-2 text-sm">
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="
                  mt-4
                  rounded-lg
                  bg-red-600
                  px-4
                  py-2
                  text-white
                "
              >
                Try again
              </button>
            </div>
          )}

          {data && !isLoading && (
            <>
              <div className="mb-4 flex justify-between">
                <p>Results: {data.total}</p>

                {isFetching && (
                  <span className="text-sm text-gray-500">Updating...</span>
                )}
              </div>

              {data.results.length === 0 ? (
                <div className="rounded-xl border border-dashed p-8 text-center">
                  <h2 className="text-lg font-semibold">No profiles found</h2>

                  <p className="mt-2 text-sm text-gray-600">
                    Try changing your search filters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.results.map((item, index) => (
                    <ResultCard key={index} result={item} />
                  ))}
                </div>
              )}

              {data.results.length > 0 && (
                <nav
                  aria-label="Search results pagination"
                  className="mt-6 flex items-center justify-between border-t pt-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setPage((currentPage) => currentPage - 1);
                      focusSearch();
                    }}
                    disabled={page === 1 || isFetching}
                    className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600" aria-live="polite">
                    Page {page}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (data.next_page !== null) {
                        setPage(data.next_page);
                        focusSearch();
                      }
                    }}
                    disabled={data.next_page === null || isFetching}
                    className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </form>
    </div>
  );
}
