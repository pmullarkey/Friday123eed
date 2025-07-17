import React, { useState, useEffect } from "react";
import { questions } from "./data/questions";
import { calculateScores } from "./scoring";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { modelChartTypes } from "./chartConfig";

const ALL_MODELS = Array.from(new Set(questions.map(q => q.model)));


export default function App() {
  const [answers, setAnswers] = useState({});
  const [selectedModels, setSelectedModels] = useState([]);
  const [activeModels, setActiveModels] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedModels = JSON.parse(localStorage.getItem("leadership_selectedModels"));
    const savedAnswers = JSON.parse(localStorage.getItem("leadership_answers"));
    if (savedModels) {
      setSelectedModels(savedModels);
      setActiveModels(savedModels);
    }
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leadership_selectedModels", JSON.stringify(selectedModels));
  }, [selectedModels]);

  useEffect(() => {
    localStorage.setItem("leadership_answers", JSON.stringify(answers));
  }, [answers]);

  const handleStartOver = () => {
    localStorage.removeItem("leadership_selectedModels");
    localStorage.removeItem("leadership_answers");
    setAnswers({});
    setSelectedModels([]);
    setActiveModels(null);
    setShowResults(false);
  };
        

  const handleApplyModels = () => {
    if (selectedModels.length > 0) {
      setActiveModels(selectedModels);
      setAnswers({});
      setShowResults(false);
    }
  };

  const filteredQuestions = activeModels
    ? questions.filter((q) => activeModels.includes(q.model))
    : [];

  const scores = showResults ? calculateScores(answers, activeModels) : null;

  const renderChartForModel = (model, score) => {
    const type = modelChartTypes[model];
    const data = { [model]: score };

    switch (type) {
      case "radar":
        return <RadarChart scores={data} title={model} key={model} />;
      case "bar":
        return <BarChart scores={data} title={model} key={model} />;
      case "pie":
  return (
    <>
      {/* Model Selection UI */}
      {!activeModels && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Select Leadership Models</h1>
          <div className="space-y-2">
            {availableModels.map((model) => (
              <div key={model} className="flex items-center">
                <input
                  type="checkbox"
                  id={model}
                  checked={selectedModels.includes(model)}
                  onChange={() => handleModelToggle(model)}
                  className="mr-2"
                />
                <label htmlFor={model}>{model}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleApplyModels}
            className="mt-4 bg-monumentBlue text-white px-4 py-2 rounded"
            disabled={selectedModels.length === 0}
          >
            Start Assessment
          </button>
        </div>
      )}

      {/* Main Assessment UI */}
      {activeModels && !showResults && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Leadership Assessment</h1>
          <Assessment questions={filteredQuestions} answers={answers} setAnswers={setAnswers} />
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setShowResults(true)}
              className="bg-monumentAccent text-white px-4 py-2 rounded"
            >
              Submit Assessment
            </button>
            <button
              onClick={handleStartOver}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* Results Display */}
      {showResults && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-monumentBlue mb-4">Your Leadership Scores</h2>
          {scores && Object.keys(scores).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(scores).map(([model, score]) => (
                <li key={model} className="flex justify-between border-b pb-1">
                  <span>{model}</span>
                  <span className="font-mono">{score}/9</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 mt-2">
              ⚠️ No results available. Please ensure you selected valid models and answered questions.
            </p>
          )}
        </div>
      )}
    </>
  );
}
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-monumentBlue mb-4">Leadership Assessment</h1>

      {/* Inline Model Selection */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Select Models to Assess:</h2>
        <div className="flex flex-wrap gap-4 mb-2">
          {ALL_MODELS.map((model) => (
            <label key={model} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={() =>
                  setSelectedModels((prev) =>
                    prev.includes(model)
                      ? prev.filter((m) => m !== model)
                      : [...prev, model]
                  )
                }
              />
              {model}
            </label>
          ))}
        </div>

      {showResults && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-monumentBlue mb-4">Your Leadership Scores</h2>
          {scores && Object.keys(scores).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(scores).map(([model, score]) => (
                <li key={model} className="flex justify-between border-b pb-1">
                  <span>{model}</span>
                  <span className="font-mono">{score}/9</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 mt-2">
              ⚠️ No results available. Please ensure you selected valid models and answered questions.
            </p>
          )}
        </div>
      )}
  </div>
)}


        <button
          className="bg-monumentBlue text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={selectedModels.length === 0}
          onClick={handleApplyModels}
        >
          Apply Selection
        </button>
      </div>

      {/* Main Assessment UI */}
      {activeModels && !showResults && (
        <>
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
            {filteredQuestions.map((q) => (
              <div key={q.id}>
                <p className="font-medium">{q.text}</p>
                <div className="flex gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={q.id}
                        value={val}
                        checked={answers[q.id] === val}
                        onChange={() =>
                          setAnswers({ ...answers, [q.id]: val })
                        }
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Answered {Object.keys(answers).length} of {filteredQuestions.length}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div
                className="bg-monumentAccent h-2 rounded"
                style={{
                  width: `${(Object.keys(answers).length / filteredQuestions.length) * 100}%`
                }}
              />
</div>
  );
}
    </>
  );
}
