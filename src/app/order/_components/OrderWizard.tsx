"use client";

import { useOrderForm } from "@/app/order/_hooks/useOrderForm";
import { useOrderOptions } from "@/app/order/_hooks/useOrderOptions";
import { useOrderSocket } from "@/app/order/_services/order.socket";
import { OrderNavbar } from "@/app/order/_components/layout/OrderNavbar";
import { OrderFooter } from "@/app/order/_components/layout/OrderFooter";
import { DesktopStepper } from "@/app/order/_components/layout/DesktopStepper";
import { MobileStepper } from "@/app/order/_components/layout/MobileStepper";
import { ProgressBar } from "@/app/order/_components/layout/ProgressBar";
import { PriceSubtotalBar } from "@/app/order/_components/price/PriceSubtotalBar";
import { Step1ServiceDetails } from "@/app/order/_components/step1/Step1ServiceDetails";
import { Step2PaperDetails } from "@/app/order/_components/step2/Step2PaperDetails";
import { Step3ReviewCheckout } from "@/app/order/_components/step3/Step3ReviewCheckout";
import type { OrderWizardProps } from "@/app/order/_props/order.props";

export function OrderWizard({ initialParams }: OrderWizardProps) {
  useOrderSocket();
  const { options } = useOrderOptions();
  const { 
    state, priceState, setPriceState, updateStep1, updateStep2, updateStep3, nextStep, prevStep 
  } = useOrderForm(initialParams);

  const renderStep = () => {
    switch (state.step) {
      case 1: return <Step1ServiceDetails state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} />;
      case 2: return <Step2PaperDetails state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} />;
      case 3: return <Step3ReviewCheckout state={state} priceState={priceState} setPriceState={setPriceState} options={options} updateStep1={updateStep1} updateStep2={updateStep2} updateStep3={updateStep3} nextStep={nextStep} prevStep={prevStep} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#e8e6e1]">
      <OrderNavbar />
      <ProgressBar step={state.step} />
      
      <div className="container mx-auto flex flex-1 flex-col gap-6 p-4 lg:flex-row lg:p-8">
        <aside className="hidden w-72 lg:block">
          {/* <DesktopStepper currentStep={state.step} onStepClick={(_s: 1 | 2 | 3) => handle click} /> */}
          <DesktopStepper currentStep={state.step} onStepClick={() => {/* handle click */}} />
        </aside>

        <section className="flex-1 space-y-6">
          <div className="lg:hidden">
            {/* <MobileStepper currentStep={state.step} onStepClick={(_s: 1 | 2 | 3) => handle click} /> */}
            <MobileStepper currentStep={state.step} onStepClick={() => {/* handle click */}} />
          </div>
          {renderStep()}
        </section>
      </div>

      <PriceSubtotalBar 
        subtotal={priceState.subtotal} 
        isLoading={priceState.isPriceLoading} 
        onNext={nextStep} 
        onBack={prevStep} 
        showBack={state.step > 1}
        nextLabel={state.step === 3 ? "Place Order" : "Proceed"}
      />
      <OrderFooter />
    </div>
  );
}
