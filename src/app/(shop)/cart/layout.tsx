import { getPageMetadata } from '@/lib/pageSeo';

export async function generateMetadata() {
  return getPageMetadata('cart', 'Cart');
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
