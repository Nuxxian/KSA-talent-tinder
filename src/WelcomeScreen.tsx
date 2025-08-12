import React, { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onStartDiscovery: () => void;
  onViewOverview: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartDiscovery,
  onViewOverview,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-6 text-center bg-white">
      <div className="max-w-sm w-full space-y-5">
        {/* Welcome Title */}
        <div className="space-y-2">
          <h1
            className="text-lg sm:text-xl font-medium leading-tight px-2"
            style={{ color: "var(--ksa-text)" }}
          >
            Welkom op de talentenpagina van
          </h1>
          <h2
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: "var(--ksa-blue)" }}
          >
            KSA Oost-Vlaanderen
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-2 px-2">
          <p
            className="text-base font-medium"
            style={{ color: "var(--ksa-text)" }}
          >
            Ontdek hier je talenten!
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--ksa-text-light)" }}
          >
            Swipe door verschillende talenten en ontdek welke vaardigheden bij
            jou passen in de scouting
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={onStartDiscovery}
            className="w-full text-white font-medium py-3 px-6 rounded-md transition-all active:scale-95 ksa-button"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>✨</span>
              <span className="text-sm sm:text-base">Start met Ontdekken</span>
            </span>
          </button>

          <button
            onClick={onViewOverview}
            className="w-full font-medium py-3 px-6 rounded-md transition-all active:scale-95 ksa-button-secondary"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>📋</span>
              <span className="text-sm sm:text-base">Bekijk Alle Talenten</span>
            </span>
          </button>
        </div>

        <div className="pt-4 px-2">
          Click this link or scan the QR code om on ze whatsapp communicty te
          vervoegen!
          <div className="flex justify-center mt-3">
            <div className="w-32 h-32 border border-gray-200 rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs text-gray-400">QR</span>
                </div>
                <span className="text-xs text-gray-400">Mockup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
