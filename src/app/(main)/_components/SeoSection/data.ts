import type { SeoSectionData, KeywordTag } from "../../_types/seo.types";

function tag(label: string): KeywordTag {
  return {
    label,
    slug: label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  };
}

export const SEO_SECTION_DATA: SeoSectionData = {
  sectionHeading:
    "Excellence in Professional Writing, Editing & Proofreading Services",
  sectionSubheading:
    "Trusted by thousands of students and professionals worldwide. Plagiarism-free, expertly crafted, delivered on time.",

  stats: [
    {
      value:     "98%",
      label:     "Success Rate",
      ariaLabel: "98 percent client success rate",
    },
    {
      value:     "24/7",
      label:     "Support",
      ariaLabel: "24 hours a day, 7 days a week customer support",
    },
    {
      value:     "500+",
      label:     "Expert Writers",
      ariaLabel: "Over 500 expert writers available",
    },
    {
      value:     "$11",
      label:     "Starting Price",
      ariaLabel: "Starting price from 11 US dollars per page",
    },
    {
      value:     "10K+",
      label:     "Orders Delivered",
      ariaLabel: "Over ten thousand orders delivered",
    },
    {
      value:     "4.9★",
      label:     "Average Rating",
      ariaLabel: "4.9 out of 5 star average client rating",
    },
  ],

  columns: [
    {
      id:        "writing-services",
      heading:   "Professional Essay Writing & Paper Writing Services",
      expandable: true,
      body:
        "TunedEssays provides comprehensive professional writing, editing and proofreading assistance for students and professionals seeking high-quality, original papers. Our experienced writers specialise in crafting essays, research papers, dissertations, and thesis projects across all academic disciplines and professional fields. With our write my essay service, you receive thoroughly researched, original content tailored to your exact requirements, formatting style, and deadline.",
      expandedHeading: "Academic Writing Across All Disciplines",
      expandedBody:
        "Whether you need an urgent essay delivered in hours or a multi-chapter dissertation written over weeks, our platform matches you with a specialist writer holding an advanced degree in your subject. We cover arts, humanities, social sciences, STEM, business, law, nursing, and more. Every paper is written from scratch, checked for plagiarism, and formatted to APA, MLA, Chicago, Harvard, or any custom style guide.",
      tags: [
        tag("essay writing service"),
        tag("write my essay"),
        tag("paper writer"),
        tag("paper help"),
        tag("custom essays"),
        tag("buy essay online"),
        tag("essay writer for hire"),
        tag("do my essay"),
        tag("write my paper"),
        tag("essay writing help"),
      ],
      expandedTags: [
        tag("online essay writer"),
        tag("essay writing website"),
        tag("best essay writing service"),
        tag("cheap essay writing"),
        tag("fast essay writing"),
        tag("urgent essay help"),
        tag("same day essay"),
        tag("college essay help"),
        tag("university essay writing"),
        tag("graduate essay writing"),
      ],
    },

    {
      id:        "dissertation-research",
      heading:   "Dissertation, Thesis & Research Paper Writing Service",
      expandable: true,
      body:
        "From urgent assignments to complex doctoral dissertations, our paper writing service covers all academic levels from high school through PhD. Students can hire professional writers who hold advanced degrees in their respective fields. Our platform ensures secure transactions, supporting multiple payment methods for convenient and safe order processing.",
      expandedHeading: "End-to-End Research & Dissertation Support",
      expandedBody:
        "Our thesis writing service and dissertation help provide comprehensive support throughout your entire academic journey. Expert researchers and writers collaborate to deliver original, well-cited academic papers that meet the highest university standards. From research proposal to final defence, we guide clients through every step — including literature reviews, methodology chapters, data analysis, and conclusion writing.",
      tags: [
        tag("dissertation writing service"),
        tag("thesis help"),
        tag("research paper writing"),
        tag("graduate paper help"),
        tag("dissertation help online"),
        tag("buy dissertation"),
        tag("dissertation writer"),
        tag("thesis writing service"),
        tag("PhD dissertation help"),
        tag("research paper help"),
      ],
      expandedTags: [
        tag("literature review writing"),
        tag("methodology writing help"),
        tag("capstone project help"),
        tag("research proposal writing"),
        tag("annotated bibliography"),
        tag("systematic review writing"),
        tag("coursework help"),
        tag("term paper writing"),
        tag("academic paper help"),
        tag("research assistance"),
      ],
    },

    {
      id:        "editing-proofreading",
      heading:   "Professional Proofreading, Editing & Formatting Services",
      expandable: true,
      body:
        "Every paper request undergoes rigorous quality control. Our editorial team ensures complete originality, precise formatting, and strict adherence to your institution's standards. With 24/7 customer support, unlimited free revisions, and a money-back guarantee, TunedEssays prioritises your satisfaction and delivers work that exceeds your expectations.",
      expandedHeading: "Comprehensive Editing for Every Document Type",
      expandedBody:
        "From a single cover letter to a 300-page doctoral thesis, our professional editors apply meticulous attention to grammar, syntax, structure, style, and citation accuracy. We offer line editing, copy editing, structural editing, and final proofreading passes, each tailored to your specific document type and submission requirements.",
      tags: [
        tag("proofreading service"),
        tag("editing service"),
        tag("paper editing"),
        tag("plagiarism free papers"),
        tag("original content"),
        tag("essay editing"),
        tag("academic editing"),
        tag("professional proofreading"),
        tag("grammar check"),
        tag("copy editing service"),
      ],
      expandedTags: [
        tag("thesis editing"),
        tag("dissertation proofreading"),
        tag("APA formatting"),
        tag("MLA formatting"),
        tag("Chicago style editing"),
        tag("Harvard referencing"),
        tag("manuscript editing"),
        tag("business document editing"),
        tag("CV proofreading"),
        tag("cover letter editing"),
      ],
    },

    {
      id:        "specialist-subjects",
      heading:   "Specialist Subject Writing: Nursing, Law, Business & STEM",
      expandable: true,
      body:
        "Our network of over 500 specialist writers covers every major academic and professional discipline. Nursing students get care-plan essays and clinical reflection papers written by qualified healthcare writers. Law students receive precisely cited case analyses, legal memos, and mooting submissions. Business professionals get polished reports, business plans, and market analyses.",
      expandedHeading: "Technical & STEM Writing Excellence",
      expandedBody:
        "Engineering reports, lab reports, statistical analyses, and programming assignments are handled by writers with verified STEM qualifications. Data analysis support includes SPSS, R, Python, and Stata outputs with fully explained methodology. Our technical writing service extends to user manuals, white papers, and grant proposals for academic and professional contexts.",
      tags: [
        tag("nursing essay writing"),
        tag("law essay help"),
        tag("business essay writing"),
        tag("STEM assignment help"),
        tag("medical writing service"),
        tag("engineering assignment help"),
        tag("accounting homework help"),
        tag("economics paper writing"),
        tag("psychology essay help"),
        tag("sociology paper writing"),
      ],
      expandedTags: [
        tag("data analysis help"),
        tag("SPSS analysis"),
        tag("statistics assignment help"),
        tag("lab report writing"),
        tag("coding assignment help"),
        tag("programming homework help"),
        tag("chemistry paper writing"),
        tag("physics assignment help"),
        tag("biology essay writing"),
        tag("math homework help"),
      ],
    },

    {
      id:        "presentations-creative",
      heading:   "Presentations, Creative Writing & Professional Documents",
      expandable: true,
      body:
        "Beyond academic papers, TunedEssays supports all professional and creative writing needs. Our presentation writing and design service produces compelling PowerPoint decks, Keynote presentations, and pitch decks for academic and business audiences. Personal statement and admission essay writers help applicants secure places at top universities worldwide.",
      expandedHeading: "Creative & Professional Writing Services",
      expandedBody:
        "Our creative writing support covers short stories, screenplays, poetry analysis, and creative non-fiction. For professionals, we offer CV writing, LinkedIn profile optimisation, cover letter writing, and business correspondence drafting. Speech writing, grant proposal writing, and technical documentation complete our full-service professional writing offering.",
      tags: [
        tag("presentation writing"),
        tag("PowerPoint help"),
        tag("personal statement writing"),
        tag("admission essay help"),
        tag("college application essay"),
        tag("statement of purpose"),
        tag("scholarship essay writing"),
        tag("creative writing help"),
        tag("speech writing service"),
        tag("CV writing service"),
      ],
      expandedTags: [
        tag("cover letter writing"),
        tag("LinkedIn profile writing"),
        tag("business plan writing"),
        tag("grant proposal writing"),
        tag("white paper writing"),
        tag("technical writing service"),
        tag("content writing service"),
        tag("blog writing service"),
        tag("press release writing"),
        tag("report writing service"),
      ],
    },

    {
      id:        "trust-pricing",
      heading:   "Secure Payments, Fast Delivery & Satisfaction Guarantee",
      expandable: false,
      body:
        "TunedEssays combines academic excellence with a transparent, secure, and student-friendly ordering experience. Our pricing starts from just $11 per page with no hidden fees. Secure payment processing supports major credit cards and PayPal. Every order is backed by a money-back guarantee, a free unlimited revisions policy, and a strict confidentiality commitment that protects your identity and data at all times.",
      tags: [
        tag("pay for essay"),
        tag("hire essay writer"),
        tag("assignment help online"),
        tag("homework help service"),
        tag("cheap paper writing"),
        tag("affordable essay writing"),
        tag("money back guarantee"),
        tag("confidential essay service"),
        tag("secure paper ordering"),
        tag("fast essay delivery"),
        tag("urgent paper writing"),
        tag("overnight essay help"),
        tag("3 hour essay delivery"),
        tag("24 hour turnaround"),
        tag("express writing service"),
      ],
    },
  ],

  allKeywords: [
    // Transactional
    tag("essay writing service"),
    tag("write my essay"),
    tag("paper writer"),
    tag("buy essay online"),
    tag("pay for essay"),
    tag("hire essay writer"),
    tag("do my homework"),
    tag("assignment help online"),
    // Academic levels
    tag("high school essay help"),
    tag("undergraduate essay writing"),
    tag("masters dissertation help"),
    tag("PhD thesis writing"),
    tag("college paper writing"),
    // Service types
    tag("dissertation writing service"),
    tag("thesis help"),
    tag("research paper writing"),
    tag("proofreading service"),
    tag("editing service"),
    tag("presentation writing"),
    tag("personal statement writing"),
    tag("CV writing service"),
    // Quality signals
    tag("plagiarism free papers"),
    tag("original academic work"),
    tag("money back guarantee"),
    tag("unlimited revisions"),
    tag("confidential writing service"),
    // Subjects
    tag("nursing essay writing"),
    tag("law essay help"),
    tag("business essay writing"),
    tag("STEM assignment help"),
    tag("data analysis help"),
    // Urgency
    tag("urgent essay help"),
    tag("same day essay delivery"),
    tag("24 hour paper writing"),
    tag("fast turnaround writing"),
  ],
};