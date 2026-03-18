import Link from 'next/link';
import bg from '../../../images/bg.jpg';
import Image from "next/image"

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      {/* <div className="bg-navy-700 py-14">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Warranty
          </p>
          <h1 className="text-4xl font-bold text-white">Warranty</h1>
          <p className="text-gray-300 mt-2 text-sm">Last updated: March 2025</p>
        </div>
      </div>
 */}

  <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2"><Link href="/" className="hover:text-white">Home</Link> › Warranty</p>
          <h1 className="text-4xl font-bold text-white">Warranty</h1>
         
        </div>
      </section>



      {/* Content */}
      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-8 text-gray-700 leading-relaxed">

          {/* Heading + intro */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">WARRANTY</h2>
            <p className="mb-3">
              At Mattress Factory, we stand behind the quality of our products. Each mattress is manufactured with high-grade materials and undergoes rigorous quality inspection before it leaves our factory. Our warranty is our promise to you that you are purchasing a product built to last.
            </p>
            <p>
              For the purpose of this warranty policy, the terms "we", "our", "us" refer to Mattress Factory (Mattressfactory.in) and the terms "you", "your", "customer" refer to the original purchaser of the product from our website or authorized outlets.
            </p>
          </section>

          {/* What does the warranty cover */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">What Does the Warranty Cover?</h2>
            <p className="mb-3">
              Our warranty covers manufacturing defects that affect the structural integrity and comfort of the mattress. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Defects in workmanship or materials under normal use conditions.</li>
              <li>Sagging or body impressions greater than 1.5 inches that are not associated with an improper foundation or base.</li>
              <li>Physical flaw in the mattress that causes the foam material to split or crack, despite normal usage and proper handling.</li>
              <li>Defective or broken coil springs (for spring/hybrid mattresses).</li>
              <li>Cover or fabric defects caused during manufacturing, not due to external wear and tear.</li>
            </ul>
          </section>

          {/* Warranty Period */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Warranty Period</h2>
            <p className="mb-4">
              Mattress Factory provides the following warranty coverage depending on the mattress type:
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-navy-700 text-white">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Mattress Type</th>
                    <th className="text-left px-6 py-4 font-semibold">Warranty Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Memory Foam Mattress', '5 Years'],
                    ['Orthopedic Mattress', '5 Years'],
                    ['Coir Mattress', '3 Years'],
                    ['Bonnell Spring Mattress', '5 Years'],
                    ['Pocket Spring Mattress', '5 Years'],
                    ['Euro Top Mattress', '5 Years'],
                    ['Latex Foam Mattress', '5 Years'],
                    ['Hybrid Mattress', '5 Years'],
                    ['Foam Mattress', '3 Years'],
                  ].map(([type, period], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-700">{type}</td>
                      <td className="px-6 py-4 font-semibold text-navy-700">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              * Warranty period starts from the date of purchase. Please retain your purchase invoice as proof of purchase for any warranty claims.
            </p>
          </section>

          {/* What is NOT covered */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">What is NOT Covered by the Warranty?</h2>
            <p className="mb-3">
              This warranty does not cover damage or deterioration caused by factors outside of manufacturing defects. The following are explicitly excluded:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Normal wear and tear, including small impressions less than 1.5 inches.</li>
              <li>Physical abuse, misuse, burns, cuts, tears, liquid damage, or staining of any kind.</li>
              <li>Damage caused by improper handling, storage, or use of an incorrect bed frame or foundation.</li>
              <li>Damage caused by using the mattress on an unsupported or inappropriate base.</li>
              <li>Comfort preference changes — the warranty does not cover dissatisfaction with feel or firmness.</li>
              <li>Damage resulting from commercial or non-domestic use of the mattress.</li>
              <li>Products with removed or altered labels or tags.</li>
              <li>Products that have been repaired or altered by anyone other than an authorized Mattress Factory representative.</li>
              <li>Mattresses purchased from unauthorized resellers or third-party platforms not affiliated with Mattress Factory.</li>
            </ul>
          </section>

          {/* How to make a warranty claim */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">How to Make a Warranty Claim?</h2>
            <p className="mb-3">
              To initiate a warranty claim, please follow the steps below:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Step 1:</strong> Email us at{' '}
                <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">
                  info@mattressfactory.in
                </a>{' '}
                with the subject line: <em>"Warranty Claim – [Your Order Number]"</em>.
              </li>
              <li>
                <strong>Step 2:</strong> Include your full name, contact number, order number, date of purchase, and a brief description of the defect.
              </li>
              <li>
                <strong>Step 3:</strong> Attach clear photographs of the defect, the mattress label, and the mattress on its base/foundation.
              </li>
              <li>
                <strong>Step 4:</strong> Our team will review your claim and respond within 5–7 business days.
              </li>
              <li>
                <strong>Step 5:</strong> If the claim is approved, we will arrange for an inspection and/or replacement as applicable.
              </li>
            </ul>
            <p>
              Please note that Mattress Factory reserves the right to assess and determine whether a defect falls within the scope of this warranty. The decision made by Mattress Factory upon inspection shall be final.
            </p>
          </section>

          {/* Warranty Remedy */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Warranty Remedy</h2>
            <p className="mb-3">
              If a valid manufacturing defect is confirmed under warranty, Mattress Factory will, at its sole discretion, offer one of the following remedies:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Repair of the defective mattress.</li>
              <li>Replacement with the same or equivalent mattress model.</li>
              <li>Pro-rated credit toward the purchase of a new mattress (applicable in cases where the exact model is discontinued).</li>
            </ul>
            <p className="mt-4">
              Mattress Factory does not provide cash refunds under this warranty policy. Replacement or credit will only be issued after successful inspection and approval of the warranty claim.
            </p>
          </section>

          {/* Warranty Transferability */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Warranty Transferability</h2>
            <p>
              This warranty is non-transferable and applies only to the original purchaser of the mattress. The warranty becomes void if the mattress is sold, gifted, or transferred to another individual. Proof of original purchase will be required for all warranty claims.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Mattress Factory shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or performance of its products. The maximum liability of Mattress Factory under this warranty shall not exceed the original purchase price of the defective product. This warranty gives you specific legal rights, and you may also have other rights which vary from state to state.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Governing Law</h2>
            <p>
              This warranty policy shall be governed by and construed in accordance with the laws applicable in India. Any disputes arising in connection with this warranty shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka, India.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Contact</h2>
            <p className="mb-4">
              For any warranty-related queries, please feel free to reach out to us at{' '}
              <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">
                info@mattressfactory.in
              </a>
            </p>
          </section>

        </div>

    

      </div>
    </div>
  );
}