import { Portfolio } from "@/components/Portfolio";
import { notFound } from 'next/navigation';

export default async function PortfolioPage({ params }) {
  try {
    console.log("inside [slug]");
    console.log('inside PortfolioPage');
    
    const { slug } = await params;
    
    // Basic slug validation
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error('Invalid slug provided:', slug);
      notFound();
    }
    
    return (
      <main className="min-h-screen">
        <Portfolio slug={slug.trim()} />
      </main>
    );
  } catch (error) {
    console.error('Error in PortfolioPage:', error);
    notFound();
  }
}