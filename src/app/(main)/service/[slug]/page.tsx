import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";
import { ServiceHero } from "./_components/ServiceHero";
import { ServiceDetails } from "./_components/ServiceDetails";
import { RelatedContentSection } from "./_components/RelatedContentSection";
import { 
  fetchServiceBySlug, 
  fetchAcademicLevels 
} from "@/lib/services/service.service";
import { RelatedContentSkeleton } from "./_components/ServiceSkeletons";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchServiceBySlug(slug);

  if (!result.ok) {
    return {
      title: "Service Not Found | TunedEssays",
    };
  }

  const service = result.data;
  return {
    title: `${service.name} Specialist Services | TunedEssays`,
    description: service.description || `Expert ${service.name} services tailored for students and professionals.`,
    openGraph: {
      title: `${service.name} Specialist Services and Support`,
      description: service.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Expert Support`,
      description: service.description,
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const [serviceResult, levelsResult] = await Promise.all([
    fetchServiceBySlug(slug),
    fetchAcademicLevels(),
  ]);

  if (!serviceResult.ok) {
    // Graceful error handling instead of raw throw
    if (serviceResult.error.status === 404 || serviceResult.error.status === "PARSE_ERROR") {
       notFound();
    }
    // For other server errors, redirect to home or a dedicated error page
    redirect("/");
  }

  const service = serviceResult.data;
  const levels = levelsResult.ok ? levelsResult.data : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfb]">
      <Navbar activeRoute={`/service/${slug}`} />
      
      <main id="main-content" className="flex-1">
        <ServiceHero service={service} levels={levels} />
        
        <ServiceDetails service={service} />
        
        <Suspense fallback={<RelatedContentSkeleton />}>
          <RelatedContentSection serviceId={service.id} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
