import { fetchFaqs } from "@/lib/services/faq.service";
import { FALLBACK_FAQS } from "./data";
import { FaqClient } from "@/app/(main)/faqs/_components/FaqClient";

export async function FaqDataLoader() {
  const result = await fetchFaqs();
  const faqs   = result.ok ? result.data : FALLBACK_FAQS;
  return <FaqClient faqs={faqs} />;
}
