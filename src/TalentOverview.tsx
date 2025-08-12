import React from "react";
import type { Talent } from "./types";

interface TalentOverviewProps {
  talents: Talent[];
  onTalentClick?: (talent: Talent) => void;
}

const TalentOverview: React.FC<TalentOverviewProps> = ({
  talents,
  onTalentClick,
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 pb-6 max-w-lg mx-auto bg-white">
        <div className="text-center mb-5">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--ksa-text)" }}
          >
            Alle Talenten
          </h2>
          <p className="text-sm" style={{ color: "var(--ksa-text-light)" }}>
            Ontdek alle vaardigheden die je kunt ontwikkelen bij KSA
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {talents.map((talent) => (
            <div
              key={talent.id}
              onClick={() => onTalentClick?.(talent)}
              className="p-3 rounded-lg cursor-pointer transition-all active:scale-95 ksa-card"
              style={{
                background: talent.color || "var(--ksa-blue)",
              }}
            >
              <div className="text-white">
                <h3 className="text-base font-semibold mb-2">{talent.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {talent.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <p className="text-xs" style={{ color: "var(--ksa-text-light)" }}>
            {talents.length} talent{talents.length !== 1 ? "en" : ""} om te
            ontdekken
          </p>
        </div>
      </div>
    </div>
  );
};

export default TalentOverview;
