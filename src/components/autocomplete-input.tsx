import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAutocomplete } from "../api/filter-autocomplete";

type Props = {
  label: string;
  field: "skills" | "job_title";
  value: string;
  onSelect: (value: string) => void;
};

export default function AutocompleteInput({
  label,
  field,
  value,
  onSelect,
}: Props) {
  const [input, setInput] = useState(value);
  const [debouncedInput, setDebouncedInput] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setInput(value);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [value]);

  const { data, isLoading } = useQuery({
    queryKey: ["autocomplete", field, debouncedInput],

    queryFn: () => getAutocomplete(field, debouncedInput),

    enabled: debouncedInput.length > 1,
  });

  const suggestions = data?.results ?? [];

  function select(value: string) {
    setInput(value);
    setOpen(false);
    onSelect(value);
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="
          w-full
          rounded
          border
          px-3
          py-2
        "
      />

      {open && suggestions.length > 0 && (
        <div
          className="
            absolute
            z-10
            mt-1
            w-full
            rounded
            border
            bg-white
            shadow
          "
        >
          {suggestions.map((item: string) => (
            <button
              key={item}
              type="button"
              onClick={() => select(item)}
              className="
                block
                w-full
                px-3
                py-2
                text-left
                hover:bg-gray-100
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="text-xs text-gray-500 mt-1">Searching...</div>
      )}
    </div>
  );
}
