import React from "react";
import { modelDescriptions } from "./modelDescriptions";

const ALL_MODELS = Object.keys(modelDescriptions);

export default function ModelSelection({ onSubmit }) {
  const [selected, setSelected] = React.useState([]);

  const toggleModel = (model) => {
    setSelected(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit(selected);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-monumentBlue mb-4">Select Leadership Models</h1>
      <p className="mb-4 text-gray-700">Choose one or more models to begin your personalized assessment:</p>
      <ul className="space-y-4 mb-6">
        {ALL_MODELS.map((model) => (
          <li key={model} className="border p-4 rounded shadow-sm">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={selected.includes(model)}
                onChange={() => toggleModel(model)}
              />
              <div>
                <p className="font-semibold text-monumentBlue">{model}</p>
                <p className="text-sm text-gray-700 italic">{modelDescriptions[model].description}</p>
                <p className="text-sm text-gray-500 mt-1">{modelDescriptions[model].whyAssess}</p>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <button
        disabled={selected.length === 0}
        onClick={handleSubmit}
        className="bg-monumentBlue text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Start Assessment
      </button>
    </div>
  );
}