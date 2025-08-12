import { useState } from "react";
import "./App.css";
import CardSlider from "./CardSlider";
import Navigation from "./Navigation";
import WelcomeScreen from "./WelcomeScreen";
import TalentOverview from "./TalentOverview";
import type { Question, Talent } from "./types";

const talents: Talent[] = [
  {
    id: 1,
    title: "Leiderschap",
    description:
      "Leid je groep met vertrouwen! Als natuurlijke leider inspireer je anderen, neem je verantwoordelijkheid en help je iedereen om hun beste zelf te zijn tijdens activiteiten en kampen.",
    color: "#4a7ae8",
  },
  {
    id: 2,
    title: "Creativiteit",
    description:
      "Breng kleur in elke activiteit! Met jouw creativiteit verzin je originele spelletjes, knutselprojecten en thematische activiteiten die iedereen lang zullen bijblijven.",
    color: "#6b73ff",
  },
  {
    id: 3,
    title: "Teamwork",
    description:
      "Samen staan we sterk! Jij weet hoe je goed kunt samenwerken, anderen kunt motiveren en zorgt dat iedereen zich welkom voelt in de groep.",
    color: "#4f9cf9",
  },
  {
    id: 4,
    title: "Communicatie",
    description:
      "Jouw stem wordt gehoord! Je communiceert helder, luistert goed naar anderen en weet hoe je boodschappen op een begrijpelijke manier overbrengt.",
    color: "#5a6acf",
  },
  {
    id: 5,
    title: "Organisatie",
    description:
      "Alles op rolletjes! Met jouw organisatietalent zorg je ervoor dat activiteiten vlot verlopen, materiaal klaarstaat en iedereen weet wat er van hen verwacht wordt.",
    color: "#3366cc",
  },
  {
    id: 6,
    title: "Empathie",
    description:
      "Jij voelt anderen aan! Je hebt een natuurlijk vermogen om te begrijpen hoe anderen zich voelen en biedt steun wanneer het nodig is.",
    color: "#7c3aed",
  },
  {
    id: 7,
    title: "Sportiviteit",
    description:
      "Actief en energiek! Je houdt van bewegen, sport en buitenactiviteiten. Je motiveert anderen om mee te doen en zorgt voor een gezonde competitiegeest.",
    color: "#2952a3",
  },
  {
    id: 8,
    title: "Technische Vaardigheden",
    description:
      "Handig met tools en technieken! Van knopen leggen tot tentjes opzetten, jij weet hoe dingen werken en helpt anderen graag met praktische zaken.",
    color: "#4a90e2",
  },
];

const questions: Question[] = [
  {
    id: 1,
    text: "Neem je graag de leiding tijdens groepsactiviteiten?",
    talentId: 1,
    color: "#4a7ae8",
  },
  {
    id: 2,
    text: "Verzin je vaak nieuwe en originele ideeën voor spelletjes?",
    talentId: 2,
    color: "#6b73ff",
  },
  {
    id: 3,
    text: "Werk je liever samen met anderen dan alleen?",
    talentId: 3,
    color: "#4f9cf9",
  },
  {
    id: 4,
    text: "Luisteren anderen goed naar je wanneer je iets uitlegt?",
    talentId: 4,
    color: "#5a6acf",
  },
  {
    id: 5,
    text: "Hou je ervan om activiteiten van tevoren goed te plannen?",
    talentId: 5,
    color: "#3366cc",
  },
  {
    id: 6,
    text: "Merk je snel op wanneer iemand zich niet goed voelt?",
    talentId: 6,
    color: "#7c3aed",
  },
  {
    id: 7,
    text: "Doe je graag mee aan sportieve activiteiten en buitenspelen?",
    talentId: 7,
    color: "#2952a3",
  },
  {
    id: 8,
    text: "Ben je handig met het maken en repareren van dingen?",
    talentId: 8,
    color: "#4a90e2",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [done, setDone] = useState(false);
  const [selectedTalents, setSelectedTalents] = useState<Talent[]>([]);

  const handleSwipeLeft = (question: Question) => {
    console.log("Swiped left on question:", question.text);
    // Question rejected, no action needed
  };

  const handleSwipeRight = (question: Question) => {
    console.log("Swiped right on question:", question.text);
    const talent = talents.find((t) => t.id === question.talentId);
    if (talent && !selectedTalents.find((t) => t.id === talent.id)) {
      setSelectedTalents((prev) => [...prev, talent]);
    }
  };

  const handleAllCardsProcessed = () => {
    setDone(true);
    console.log("All cards have been processed!");

    // Save results to localStorage only when questionnaire is completed
    if (selectedTalents.length > 0) {
      const resultsData = {
        talents: selectedTalents,
        timestamp: Date.now(),
        date: new Date().toISOString(),
      };
      localStorage.setItem("ksa-talents-results", JSON.stringify(resultsData));
    }

    // Save completion timestamp
    localStorage.setItem(
      "ksa-talents-last-completed",
      new Date().toISOString(),
    );
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== "discover") {
      setDone(false);
    }
  };

  const handleStartDiscovery = () => {
    setCurrentPage("discover");
  };

  const handleViewOverview = () => {
    setCurrentPage("overview");
  };

  const handleTalentClick = (talent: Talent) => {
    console.log("Clicked on talent:", talent.title);
  };

  const handleRestart = () => {
    setSelectedTalents([]);
    setDone(false);
    setCurrentPage("discover");
    // Clear all localStorage data
    localStorage.removeItem("ksa-talents-results");
    localStorage.removeItem("ksa-talents-progress");
    localStorage.removeItem("ksa-talents-selected");
    localStorage.removeItem("ksa-talents-rejected");
    localStorage.removeItem("ksa-talents-last-completed");
  };

  const handleBackToOverview = () => {
    setCurrentPage("overview");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "welcome":
        return (
          <WelcomeScreen
            onStartDiscovery={handleStartDiscovery}
            onViewOverview={handleViewOverview}
          />
        );
      case "discover":
        return (
          <CardSlider
            questions={questions}
            onQuestionSwipeLeft={handleSwipeLeft}
            onQuestionSwipeRight={handleSwipeRight}
            onAllCardsProcessed={handleAllCardsProcessed}
            selectedTalents={selectedTalents}
            done={done}
            onRestart={handleRestart}
            onBackToOverview={handleBackToOverview}
          />
        );
      case "overview":
        return (
          <TalentOverview talents={talents} onTalentClick={handleTalentClick} />
        );
      default:
        return (
          <WelcomeScreen
            onStartDiscovery={handleStartDiscovery}
            onViewOverview={handleViewOverview}
          />
        );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
      <header className="w-full bg-white border-b border-gray-100 p-3 flex items-center justify-center flex-shrink-0">
        <h1
          className="text-lg sm:text-xl font-semibold text-ksa-blue"
          style={{ color: "var(--ksa-blue)" }}
        >
          KSA Talenten
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">{renderCurrentPage()}</main>
      <footer className="w-full">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      </footer>
    </div>
  );
}

export default App;
