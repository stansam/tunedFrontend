import type { ServiceDetailsProps } from "@/lib/props/service.props";

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-12">
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-600">
            <h2 id="overview" className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Service <span className="text-emerald-600">Overview</span>
            </h2>
            <div 
              className="text-slate-600 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: service.content }} 
            />
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 py-10 border-y border-slate-100">
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-slate-50 border border-slate-100/50">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Quality Guarantee</span>
              <h3 className="text-lg font-bold text-slate-900">100% Original Work</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every project is built from scratch by our subject matter experts, backed by a comprehensive plagiarism report.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-5 rounded-2xl bg-slate-50 border border-slate-100/50">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Support</span>
              <h3 className="text-lg font-bold text-slate-900">24/7 Expert Assistance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our support team and assigned writers are available around the clock to address your queries and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
