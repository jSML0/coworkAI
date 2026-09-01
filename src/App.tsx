import React from 'react';
import { OrchestratorProvider, useOrchestrator } from './context/OrchestratorContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { StepHeader } from './components/common/StepHeader';
import { BottomActionBar } from './components/common/BottomActionBar';
import { PassModal } from './components/common/PassModal';
import { TicketModal } from './components/common/TicketModal';
import { AddMemberModal } from './components/common/AddMemberModal';
import { Screen1Setup } from './components/scheduler/Screen1Setup';
import { Screen2Matching } from './components/recommender/Screen2Matching';
import { Screen3Pay } from './components/pay/Screen3Pay';
import { DashboardScreen } from './components/dashboard/DashboardScreen';

const OrchestratorAppContent: React.FC = () => {
  const { step, showDashboard } = useOrchestrator();

  return (
    <DeviceFrame>
      <div className="flex flex-col min-h-full">
        {/* Sticky Header with Stepper */}
        <StepHeader />

        {/* Screen Content Switcher */}
        <div className="flex-1">
          {showDashboard ? (
            <DashboardScreen />
          ) : (
            <>
              {step === 1 && <Screen1Setup />}
              {step === 2 && <Screen2Matching />}
              {step === 3 && <Screen3Pay />}
            </>
          )}
        </div>

        {/* Sticky Bottom Action Bar */}
        <BottomActionBar />
      </div>

      {/* Global Interactive Modals */}
      <PassModal />
      <TicketModal />
      <AddMemberModal />
    </DeviceFrame>
  );
};

export function App() {
  return (
    <OrchestratorProvider>
      <OrchestratorAppContent />
    </OrchestratorProvider>
  );
}

export default App;
