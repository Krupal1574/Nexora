"use client";

import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Start typing an address...",
  className = "",
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ formatted: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/address/autocomplete?text=${encodeURIComponent(query)}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data.results || []);
            setIsOpen(true);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (item: { formatted: string }) => {
    setQuery(item.formatted);
    setIsOpen(false);
    onAddressSelect(item.formatted);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-start gap-2 text-sm text-gray-700"
              onClick={() => handleSelect(item)}
            >
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
              <span>{item.formatted}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
