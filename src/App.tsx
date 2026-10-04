import React from 'react';
import { TemporalProvider } from './context/TemporalContext';
import { HeaderHUD } from './components/layout/HeaderHUD';
import { TemporalHUD } from './components/layout/TemporalHUD';
import { MapWorkspace } from './components/map/MapWorkspace';
import { EntityInspector } from './components/entities/EntityInspector';
import { Timeline } from './components/timeline/Timeline';
import { SearchModal } from './components/search/SearchModal';
import { StepIntoEraModal } from './components/stepIntoEra/StepIntoEraModal';
import { SourcesModal } from './components/sources/SourcesModal';

export const AppContent: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-[#0A0C10] text-[#E2DDD3] font-sans overflow-hidden carto-grid relative">
      {/* Top HUD: Cinematic Header & Epoch Shortcuts */}
      <HeaderHUD />

      {/* Main Viewport: The Historical Map Workspace & Entity Inspector */}
      <div className="flex-1 relative w-full overflow-hidden flex min-h-0">
        {/* Floating Temporal HUD on top-left of Map */}
        <TemporalHUD />

        {/* Center Stage: The Historical Map */}
        <MapWorkspace />

        {/* Right Stage: Contextual Slideout Entity Inspector */}
        <EntityInspector />
      </div>

      {/* Master Temporal Engine: Bottom Persistent Timeline */}
      <Timeline />

      {/* Interactive Modals */}
      <SearchModal />
      <StepIntoEraModal />
      <SourcesModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <TemporalProvider>
      <AppContent />
    </TemporalProvider>
  );
};

export default App;
