import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { PowersGrid } from '@/components/PowersGrid';
import { TechFeatures } from '@/components/TechFeatures';
import { HowItWorks } from '@/components/HowItWorks';
import { Trust } from '@/components/Trust';
import { OrderForm } from '@/components/OrderForm';
import { Footer } from '@/components/Footer';
import { SeoText } from '@/components/SeoText';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <PowersGrid />
        <TechFeatures />
        <HowItWorks />
        <Trust />
        <OrderForm />
        <SeoText />
      </main>
      <Footer />
    </>
  );
}
