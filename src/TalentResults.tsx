import React, { useState, useEffect } from "react";
import type { Talent } from "./types";

interface TalentResultsProps {
  selectedTalents: Talent[];
  onRestart: () => void;
  onBackToOverview: () => void;
}

const TalentResults: React.FC<TalentResultsProps> = ({
  selectedTalents,
  onRestart,
  onBackToOverview,
}) => {
  const [savedDate, setSavedDate] = useState<string | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("ksa-talents-results");
    if (savedResults) {
      try {
        const results = JSON.parse(savedResults);
        if (results.date) {
          const date = new Date(results.date);
          setSavedDate(
            date.toLocaleDateString("nl-BE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        }
      } catch (error) {
        console.error("Failed to parse saved date:", error);
      }
    }
  }, []);
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 pb-6 max-w-lg mx-auto bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-3">🎯</div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--ksa-text)" }}
          >
            Jouw Geselecteerde Talenten
          </h2>
          <p
            className="text-sm mb-2"
            style={{ color: "var(--ksa-text-light)" }}
          >
            Dit zijn de talenten die bij jou passen op basis van de vragenlijst
          </p>
          {savedDate && (
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full">
              <span className="text-xs" style={{ color: "var(--ksa-blue)" }}>
                📅 Opgeslagen op {savedDate}
              </span>
            </div>
          )}
        </div>

        {/* Selected Talents List */}
        {selectedTalents.length > 0 ? (
          <div className="space-y-3 mb-6">
            {selectedTalents.map((talent) => (
              <div
                key={talent.id}
                className="p-4 rounded-lg ksa-card border border-gray-100"
                style={{
                  backgroundColor: "white",
                  borderLeft: `4px solid ${talent.color || "var(--ksa-blue)"}`,
                }}
              >
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: talent.color || "var(--ksa-blue)" }}
                >
                  {talent.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--ksa-text-light)" }}
                >
                  {talent.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl mb-3">🤷‍♀️</div>
              <h3
                className="font-semibold mb-2"
                style={{ color: "var(--ksa-text)" }}
              >
                Geen talenten gevonden
              </h3>
              <p className="text-sm" style={{ color: "var(--ksa-text-light)" }}>
                Je hebt geen talenten geselecteerd tijdens de vragenlijst.
                Probeer opnieuw en antwoord "Ja" op vragen die bij jou passen.
              </p>
            </div>
          </div>
        )}

        {/* Summary */}
        {selectedTalents.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <h3
                className="font-semibold mb-1"
                style={{ color: "var(--ksa-blue)" }}
              >
                📊 Jouw Talent Profiel
              </h3>
              <p className="text-sm" style={{ color: "var(--ksa-text-light)" }}>
                Je hebt{" "}
                <strong>{selectedTalents.length} van de 8 talenten</strong> als
                sterk punt geïdentificeerd
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={onRestart} className="w-full ksa-button text-sm">
            🔄 Vragenlijst Opnieuw Doen
          </button>
          <button
            onClick={onBackToOverview}
            className="w-full ksa-button-secondary text-sm"
          >
            📋 Alle Talenten Bekijken
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentResults;
