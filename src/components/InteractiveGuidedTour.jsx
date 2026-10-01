import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Layers, 
  Check, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { DashboardScreen, TeamScreen, EmployeeProfileScreen } from './screens/DashboardAndTeam';
import { 
  AssignStep1Describe, 
  AssignStep2AISuggest, 
  AssignStep3Duration, 
  PermissionDiffScreen, 
  TaskAssignedSuccessScreen 
} from './screens/TaskCreationFlow';
import { 
  LiveTaskHelperScreen, 
  DeniedActionAlertModal, 
  AuditLogScreen, 
  DelegationExpirySummaryScreen 
} from './screens/HelperAndAuditScreens';
import { teamMembers, initialOrders, initialAuditLog } from '../data/mockData';

export const InteractiveGuidedTour = ({ currentStep, onSetStep, onOpenPayload }) => {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]); // Riya
  const [orders, setOrders] = useState(initialOrders);
  const [auditLogs, setAuditLogs] = useState(initialAuditLog);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [deniedActionName, setDeniedActionName] = useState('Refund Order #103');
  const [taskPrompt, setTaskPrompt] = useState("Please dispatch orders #101–105 by 6 PM today.");

  const stepTitles = [
    { num: 1, name: '1. Dashboard' },
    { num: 2, name: '2. My Team' },
    { num: 3, name: '3. Profile' },
    { num: 4, name: '4. Describe' },
    { num: 5, name: '5. AI Suggest' },
    { num: 6, name: '6. Duration' },
    { num: 7, name: '7. Diff' },
    { num: 8, name: '8. Assigned' },
    { num: 9, name: '9. Helper UI' },
    { num: 10, name: '10. Denied Alert' },
    { num: 11, name: '11. Audit Log' },
    { num: 12, name: '12. Expiry Summary' }
  ];

  const handleDispatch = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Dispatched' } : o));
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs(prev => [
      { id: `aud-${Date.now()}`, time: timeStr, user: 'Riya Sharma', action: `Dispatched Order #${orderId}`, scope: 'orders:update_dispatch', status: 'Allowed' },
      ...prev
    ]);
  };

  const handleAttemptDenied = (actionName) => {
    setDeniedActionName(actionName);
    setShowDeniedModal(true);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs(prev => [
      { id: `aud-${Date.now()}`, time: timeStr, user: 'Riya Sharma', action: `Attempted ${actionName}`, scope: 'orders:refund', status: 'Blocked' },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Stepper Navigation Bar */}
      <div className="card-chic p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)]">
            Step {currentStep} of 12
          </span>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
            {stepTitles[currentStep - 1]?.name}
          </h3>
        </div>

        {/* Stepper Pills */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {stepTitles.map((s) => (
            <button
              key={s.num}
              onClick={() => onSetStep(s.num)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentStep === s.num
                  ? 'bg-[var(--brand-pink)] text-white shadow-sm'
                  : currentStep > s.num
                  ? 'bg-[var(--bg-surface-subtle)] text-[var(--brand-pink)] border border-[var(--border-subtle)]'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="btn-outline-subtle text-xs py-1.5 px-3 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>
          
          <button
            onClick={() => onSetStep(Math.min(12, currentStep + 1))}
            disabled={currentStep === 12}
            className="btn-pink-primary text-xs py-1.5 px-3.5 disabled:opacity-40"
          >
            <span>Next Step</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Screen Body */}
      <div className="min-h-[480px]">
        {currentStep === 1 && (
          <DashboardScreen 
            onAssignClick={() => onSetStep(4)} 
            onViewTeamClick={() => onSetStep(2)}
            onAuditClick={() => onSetStep(11)}
          />
        )}

        {currentStep === 2 && (
          <TeamScreen 
            team={teamMembers}
            onSelectMember={(m) => { setSelectedMember(m); onSetStep(3); }}
            onAssignClick={(m) => { if(m) setSelectedMember(m); onSetStep(4); }}
          />
        )}

        {currentStep === 3 && (
          <EmployeeProfileScreen 
            member={selectedMember}
            onBack={() => onSetStep(2)}
            onAssignTask={() => onSetStep(4)}
          />
        )}

        {currentStep === 4 && (
          <AssignStep1Describe 
            helperName={selectedMember.name}
            initialText={taskPrompt}
            onNext={(txt) => { setTaskPrompt(txt); onSetStep(5); }}
          />
        )}

        {currentStep === 5 && (
          <AssignStep2AISuggest 
            onNext={() => onSetStep(6)}
            onBack={() => onSetStep(4)}
            onInspectDiff={() => onSetStep(7)}
          />
        )}

        {currentStep === 6 && (
          <AssignStep3Duration 
            onNext={() => onSetStep(7)}
            onBack={() => onSetStep(5)}
          />
        )}

        {currentStep === 7 && (
          <PermissionDiffScreen 
            onProceed={() => onSetStep(8)}
          />
        )}

        {currentStep === 8 && (
          <TaskAssignedSuccessScreen 
            onOpenLiveTask={() => onSetStep(9)}
          />
        )}

        {currentStep === 9 && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl border text-center text-xs font-semibold bg-[var(--brand-peach)] text-[var(--brand-pink)] max-w-md mx-auto">
              💡 Tip: Click "Mark Dispatched" or test the Ghost UI buttons below!
            </div>
            <LiveTaskHelperScreen 
              orders={orders}
              onDispatchOrder={handleDispatch}
              onAttemptDeniedAction={handleAttemptDenied}
              onCompleteAll={() => onSetStep(12)}
            />
          </div>
        )}

        {currentStep === 10 && (
          <div className="py-6">
            <div className="max-w-md mx-auto card-chic p-6 text-center space-y-4 border-2 shadow-pop" style={{ borderColor: 'var(--badge-red-border)' }}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]">
                <AlertTriangle size={15} />
                <span>ACTION DENIED</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
                Unauthorized Action: Refund Order
              </h3>
              <p className="text-xs font-medium text-[var(--text-muted)]">
                Refunds and payment details are not included in this task.
              </p>
              <DeniedActionIllustration />
              <p className="text-base font-bold italic text-[var(--brand-pink)]" style={{ fontFamily: 'Playfair Display' }}>
                Not today! 💁‍♀️
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={() => onSetStep(9)} className="flex-1 btn-outline-subtle text-xs py-2 justify-center">
                  Back to Helper UI
                </button>
                <button onClick={() => onSetStep(11)} className="flex-1 btn-pink-primary text-xs py-2 justify-center">
                  View in Audit Log →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 11 && (
          <AuditLogScreen logs={auditLogs} />
        )}

        {currentStep === 12 && (
          <DelegationExpirySummaryScreen 
            onNewTask={() => onSetStep(4)}
            onViewAudit={() => onSetStep(11)}
          />
        )}
      </div>

      {/* Denied Action Alert Popup for Step 9 */}
      <DeniedActionAlertModal
        isOpen={showDeniedModal}
        onClose={() => setShowDeniedModal(false)}
        attemptedAction={deniedActionName}
      />
    </div>
  );
};
