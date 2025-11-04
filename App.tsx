import React, { useState, useCallback, useMemo } from 'react';
import { Build, Mode, Component, ComponentType } from './types';
import { ALL_COMPONENTS } from './data/components';
import AssemblyArea from './components/AssemblyArea';
import ComponentSelector from './components/ComponentSelector';
import CompatibilityReport from './components/CompatibilityReport';
import TutorialMode from './components/TutorialMode';
import QuizMode from './components/QuizMode';
import AiAssistant from './components/AiAssistant';
import { analyzeCompatibility } from './services/geminiService';
import { AssemblyIcon, TutorialIcon, QuizIcon, AiAssistantIcon } from './components/icons';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('ASSEMBLY');
  const [build, setBuild] = useState<Build>({});
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectComponent = useCallback((component: Component) => {
    setBuild(prevBuild => ({
      ...prevBuild,
      [component.type]: component,
    }));
  }, []);

  const handleRemoveComponent = useCallback((componentType: ComponentType) => {
    setBuild(prevBuild => {
      const newBuild = { ...prevBuild };
      delete newBuild[componentType];
      return newBuild;
    });
  }, []);
  
  const handleAnalyzeBuild = async () => {
    setIsLoading(true);
    setReport(null);
    try {
      const result = await analyzeCompatibility(build);
      setReport(result);
    } catch (error) {
      console.error("Failed to analyze build:", error);
      setReport({ error: "Terjadi galat saat menganalisis kompatibilitas. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedComponentCount = useMemo(() => Object.keys(build).length, [build]);

  const renderContent = () => {
    switch (mode) {
      case 'TUTORIAL':
        return <TutorialMode />;
      case 'QUIZ':
        return <QuizMode />;
      case 'AI_ASSISTANT':
        return <AiAssistant />;
      case 'ASSEMBLY':
      default:
        return (
          <div className="flex-grow flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
            <ComponentSelector
              allComponents={ALL_COMPONENTS}
              selectedBuild={build}
              onSelectComponent={handleSelectComponent}
            />
            <div className="flex-grow flex flex-col gap-4 w-full lg:w-2/3">
              <AssemblyArea build={build} onRemoveComponent={handleRemoveComponent} />
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex-shrink-0 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-cyan-400">Pemeriksaan Kompatibilitas</h2>
                  <p className="text-gray-400 text-sm">Komponen Terpilih: {selectedComponentCount}</p>
                </div>
                <button
                  onClick={handleAnalyzeBuild}
                  disabled={isLoading || selectedComponentCount < 2}
                  className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
                >
                  {isLoading ? 'Menganalisis...' : 'Jalankan Analisis AI'}
                </button>
              </div>
              <CompatibilityReport report={report} isLoading={isLoading} />
            </div>
          </div>
        );
    }
  };
  
  const NavButton = ({ targetMode, icon, label }: { targetMode: Mode, icon: React.ReactNode, label: string }) => (
    <button
      onClick={() => setMode(targetMode)}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 w-24 ${
        mode === targetMode ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
       <header className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700 p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Simulator Rakit PC AI
        </h1>
        <nav className="flex items-center space-x-2 bg-gray-900/50 p-1 rounded-xl border border-gray-700">
          <NavButton targetMode="ASSEMBLY" icon={<AssemblyIcon />} label="Perakit" />
          <NavButton targetMode="TUTORIAL" icon={<TutorialIcon />} label="Tutorial" />
          <NavButton targetMode="QUIZ" icon={<QuizIcon />} label="Kuis" />
          <NavButton targetMode="AI_ASSISTANT" icon={<AiAssistantIcon />} label="Asisten AI" />
        </nav>
      </header>
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;