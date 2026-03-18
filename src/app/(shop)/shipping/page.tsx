import Link from 'next/link';
import Image from 'next/image';
import bg from '../../../images/bg.jpg';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2"><Link href="/" className="hover:text-white">Home</Link> › Shipping Policy</p>
          <h1 className="text-4xl font-bold text-white">Shipping Policy</h1>
         
        </div>
      </section>
      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-blue-800 font-semibold text-lg">Free Delivery Pan India</p>
            <p className="text-blue-700 text-sm mt-1">Free shipping on all orders. No hidden charges.</p>
          </div>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-3">1. Delivery Timeline</h2>
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-50"><th className="text-left p-3 border border-gray-200 font-semibold">Location</th><th className="text-left p-3 border border-gray-200 font-semibold">Estimated Delivery</th></tr></thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200">Bangalore City</td><td className="p-3 border border-gray-200">1-3 Business Days</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Karnataka</td><td className="p-3 border border-gray-200">3-5 Business Days</td></tr>
                <tr><td className="p-3 border border-gray-200">Metro Cities</td><td className="p-3 border border-gray-200">4-7 Business Days</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Rest of India</td><td className="p-3 border border-gray-200">7-10 Business Days</td></tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-3">2. Order Processing</h2>
            <p>Orders are processed within 1-2 business days after payment confirmation. You will receive tracking details once dispatched.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-3">3. Tracking</h2>
            <p>You will receive an SMS and email with the tracking number once your order ships.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-3">4. Contact Us</h2>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="font-semibold text-navy-700">Mattress Factory</p>
              <p>Email: info@mattressfactory.in | Phone: +91 77606 93333</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
