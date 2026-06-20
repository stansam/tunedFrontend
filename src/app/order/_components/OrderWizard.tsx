"use client";

import { useOrderForm } from "@/app/order/_hooks/useOrderForm";
import { useOrderOptions } from "@/app/order/_hooks/useOrderOptions";
import { useOrderSocket } from "@/app/order/_services/order.socket";
import { useOrderDraft } from "@/app/order/_hooks/useOrderDraft";
import { OrderNavbar } from "@/app/order/_components/layout/OrderNavbar";
import { OrderFooter } from "@/app/order/_components/layout/OrderFooter";
import { DesktopStepper } from "@/app/order/_components/layout/DesktopStepper";
import { MobileStepper } from "@/app/order/_components/layout/MobileStepper";
import { ProgressBar } from "@/app/order/_components/layout/ProgressBar";
import { PriceSubtotalBar } from "@/app/order/_components/price/PriceSubtotalBar";
import { Step1ServiceDetails } from "@/app/order/_components/step1/Step1ServiceDetails";
import { Step2PaperDetails } from "@/app/order/_components/step2/Step2PaperDetails";
import { Step3ReviewCheckout } from "@/app/order/_components/step3/Step3ReviewCheckout";
import { toast } from "sonner";
import type { OrderWizardProps } from "@/app/order/_props/order.props";

export function OrderWizard({ initialParams }: OrderWizardProps) {
  useOrderSocket();
  const { options, isError: optionsError } = useOrderOptions();
  const { 
    state, setState, priceState, setPriceState, updateStep1, updateStep2, updateStep3, 
    nextStep, prevStep, goToStep, validateStep1, validateStep2 
  } = useOrderForm(initialParams);

  const { saveDraft: saveCurrentDraft, isSaving: isSavingDraft } = useOrderDraft();
  const handleSaveDraft = () => saveCurrentDraft(state);

  if (optionsError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#e8e6e1] p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load order options</h2>
        <p className="text-slate-500 mt-2">Please check your connection and refresh the page.</p>
        <button onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white">
          Retry
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (state.step === 1) {
      const err = validateStep1();
      if (err) return toast.error(err);
    } else if (state.step === 2) {
      const err = validateStep2();
      if (err) return toast.error(err);
    } else if (state.step === 3) {
      return;
    }
    nextStep();
  };

  const handleStepClick = (step: 1 | 2 | 3) => {
    if (step < state.step) {
      setState(p => ({ ...p, step }));
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 1: return <Step1ServiceDetails state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
      case 2: return <Step2PaperDetails state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
      case 3: return <Step3ReviewCheckout state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#e8e6e1]">
      <OrderNavbar />
      <ProgressBar step={state.step} />
      
      <div className="container mx-auto flex flex-1 flex-col gap-6 p-4 lg:flex-row lg:p-8">
        <aside className="hidden w-72 lg:block">
          <DesktopStepper currentStep={state.step} onStepClick={handleStepClick} onSaveDraft={handleSaveDraft} isSavingDraft={isSavingDraft} />
        </aside>

        <section className="flex-1 space-y-6">
          <div className="lg:hidden">
            <MobileStepper currentStep={state.step} onStepClick={handleStepClick} onSaveDraft={handleSaveDraft} isSavingDraft={isSavingDraft} />
          </div>
          {renderStep()}
        </section>
      </div>

      <PriceSubtotalBar 
        subtotal={priceState.subtotal} 
        isLoading={priceState.isPriceLoading} 
        onNext={handleNext} 
        onBack={prevStep} 
        showBack={state.step > 1}
        nextLabel={state.step === 3 ? undefined : "Proceed"}
      />
      <OrderFooter />
    </div>
  );
}
