import React from "react";
import { FileText, ShieldAlert, Award, RefreshCw, FileCode, CheckCircle2, Mail, Info, LucideIcon } from "lucide-react";

export interface TermsSection {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly content: React.ReactNode;
}

export const TERMS_SECTIONS: readonly TermsSection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Info,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          Welcome to <strong>TunedEssays</strong>. By accessing or using our platform, services, or website, you agree
          to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and
          TunedEssays.
        </p>
        <p>
          Please read these terms carefully. If you do not agree with any part of these terms, you must not access or use
          our services.
        </p>
      </div>
    ),
  },
  {
    id: "terms-of-use",
    title: "Terms of Use",
    icon: FileText,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          You must be at least 18 years old or the age of majority in your jurisdiction to create an account and use our services.
          You agree to provide accurate, complete, and current information when registering.
        </p>
        <p>
          You are entirely responsible for maintaining the confidentiality of your account credentials and for all activities
          that occur under your account. Any unauthorized access must be reported immediately.
        </p>
      </div>
    ),
  },
  {
    id: "honor-code",
    title: "Honor Code",
    icon: ShieldAlert,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm border-l-4 border-emerald-500 bg-emerald-50/50 p-4 rounded-r-xl">
        <h4 className="font-bold text-emerald-900 text-base">TunedEssays Academic Integrity & Honor Code</h4>
        <p className="text-emerald-950 font-medium">Why We Have an Honor Code</p>
        <p>
          At TunedEssays, we are committed to supporting academic and professional growth through high-quality
          proofreading, editing, formatting, and consultation services. Our goal is to enhance the clarity, coherence, and
          presentation of your original work—not to replace it.
        </p>
        <p>
          We believe that ethical editing plays a vital role in today’s learning and publishing environments, and we are
          proud to offer resources that promote academic excellence, writing confidence, and scholarly independence. To
          maintain the integrity of our services, we have adopted this Honor Code to define appropriate use and uphold
          professional standards.
        </p>
        <p className="text-emerald-950 font-medium mt-4">By using TunedEssays, all users agree to the following:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>TunedEssays is a platform for editing, reviewing, and enhancing original work, and all services must be used to support learning and ethical academic or professional development.</li>
          <li>Using TunedEssays for contract cheating or ghostwriting purposes is strictly prohibited. We do not complete assignments, write papers, or produce work meant to be submitted for credit on behalf of a client.</li>
          <li>You may not submit content we have edited or proofread as your own original work if doing so violates your institution&apos;s academic policies or Honor Code.</li>
        </ul>
        <p className="text-emerald-950 font-medium mt-4">Users must not request TunedEssays to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Write essays, dissertations, theses, or coursework for submission.</li>
          <li>Complete quizzes, tests, or examinations.</li>
          <li>Falsify, fabricate, or plagiarize any part of a document.</li>
        </ul>
        <p className="text-emerald-950 font-medium mt-4">Editors and proofreaders at TunedEssays shall not:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Write or co-write academic submissions for clients.</li>
          <li>Assist in any activity that may be deemed as academic dishonesty.</li>
          <li>Engage in any project that misrepresents authorship or originality.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "fair-use",
    title: "Fair Use Policy",
    icon: Award,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          All proofread, edited, or formatted documents provided by TunedEssays are intended solely for educational, reference,
          or developmental purposes.
        </p>
        <p className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-3 rounded-r-xl">
          <strong>CRITICAL:</strong> Documents delivered by us must not be submitted directly as your own work for academic grade
          or professional credit. This protects your academic standing and ensures compliance with ethical educational guidelines.
        </p>
      </div>
    ),
  },
  {
    id: "revisions",
    title: "Revision Policy",
    icon: RefreshCw,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          We are dedicated to your total satisfaction. Clients are entitled to free revisions within 14 days of delivery (or 30
          days for large projects such as dissertations), provided the revision instructions do not deviate from the original order specifications.
        </p>
        <p>
          Any revision requests that introduce new guidelines, guidelines contrary to the initial instructions, or exceed the standard revision count may incur extra charges.
        </p>
      </div>
    ),
  },
  {
    id: "dmca",
    title: "Copyright & DMCA",
    icon: FileCode,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          TunedEssays respects intellectual property rights. We do not host user-generated content for public distribution.
          However, if you believe that any material on our site infringes your copyrights, you may request removal by contacting
          ethics@tunedessays.com with details of the copyright holder, description of the copyrighted work, and target URL.
        </p>
      </div>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    icon: CheckCircle2,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          TunedEssays services do not guarantee specific academic grades, exam outcomes, admission selections, or publishing acceptances.
          Our services are editorial in nature.
        </p>
        <p>
          We are not responsible for any academic disciplinary actions, institutional penalties, or professional loss resulting
          from the inappropriate or unethical use of the edited materials.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
        <p>
          For honor code inquiries, suggestions, or feedback regarding ethics, contact us at:
          <br />
          <a href="mailto:ethics@tunedessays.com" className="text-emerald-600 font-semibold hover:underline">
            ethics@tunedessays.com
          </a>
        </p>
        <p>
          For general terms, account disputes, or customer support:
          <br />
          <a href="mailto:support@tunedessays.com" className="text-emerald-600 font-semibold hover:underline">
            support@tunedessays.com
          </a>
        </p>
      </div>
    ),
  },
];
