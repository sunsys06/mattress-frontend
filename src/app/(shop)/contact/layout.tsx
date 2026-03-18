import { getPageMetadata } from '@/lib/pageSeo';

export async function generateMetadata() {
  return getPageMetadata('contact', 'Contact Us');
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
