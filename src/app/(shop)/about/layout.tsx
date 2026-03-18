import { getPageMetadata } from '@/lib/pageSeo';

export async function generateMetadata() {
  return getPageMetadata('about', 'About Us');
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
