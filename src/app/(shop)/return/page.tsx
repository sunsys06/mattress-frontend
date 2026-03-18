'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RotateCcw, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import bg from '../../../images/bg.jpg';

const returnSections = [
  {
    title: 'What is your return policy?',
    content: `We do not currently offer returns or exchanges. If you need to make changes, please reach out to us at info@mattressfactory.in as soon as possible after the order has been placed.`,
  },
  {
    title: 'How Do I Request a Replacement?',
    content: `In order to initiate a replacement, you must reach out to our team with a picture of the damaged merchandise at info@mattressfactory.in within 24 hours of receipt. You must notify us about the damage during the delivery. Please take pictures of the damage for our records. We cannot initiate a replacement in the following cases:\n\n• The item is not in its original packaging.\n• The mattress has been used / slept on.\n• The size is incorrect (Please ensure the mattress will fit in the bed before ordering).`,
  },
  {
    title: 'SOMETHING APPLY',
    content: `These conditions apply to replacement requests:\n\n• The item(s) ordered must have damage or defect as evidenced through photos of the material/mattress\n• The item is in its original packaging\n• The size is incorrect (prior to use)\n\nPlease email us at info@mattressfactory.in to inform us of any of the above before returning the item to us. Once Confirmed, we'll arrange for the pick up and delivery of the replacement item at no additional cost.`,
  },
  {
    title: 'SHIPPING',
    content: `After the replacement request is approved, your new item will be shipped out within 3-7 business days. You will receive a shipping confirmation, with tracking information once your item ships.`,
  },
  {
    title: 'BULK/LARGE ORDERS',
    content: `If the order is a bulk order (more than 5 items), you will first need to pay a deposit of 50% of the total amount before we begin production. Balance payment, on delivery. Minimum order quantity: 5 items.`,
  },
  {
    title: 'MANUFACTURE LAPSES',
    content: `We guarantee quality products so you can shop with confidence.`,
  },
  {
    title: 'WHAT IF I DON\'T LIKE MY MATTRESS?',
    content: `Customer's purchase experience begins when you start browsing our store. Once a product is purchased, it is the responsibility of the buyer to ensure the suitability of the item.`,
  },
  {
    title: 'WHO IS PROVIDING THE RETURN/REPLACEMENT POLICY?',
    content: `We are providing the return/replacement policy for our customers.`,
  },
  {
    title: 'DISCLAIMER',
    content: `Mattressfactory.in ("Mattressfactory.in") is committed to giving high-quality, affordable, durable and value for money products to our customers. You acknowledge that Mattressfactory.in has featured all the information on the Features & Condition page of the Website. You represent and warrant that you have read and understand the information on this page. Mattressfactory.in is not and will not be responsible and liable for any customer(s) that have not complied with the conditions described on the page.

More Return/replace request will be accepted after inspection done by the technician.

Return cases for the mattress:
• Deformity
• Cover Damage
• Sleep surface irregular – both sides – in seam at edges

When a return is used, it can be sent to our returns team for verification and the decision about an issue offer reissue is final.`,
  },
  {
    title: 'Contact Us',
    content: `All Return/replace request must be sent to info@mattressfactory.in. Do not submit to the office in case of any Tampering.`,
  },
];

const additionalPolicies = [
  {
    title: 'CONDITIONS',
    content: `Given the nature of the items we sell, the following exceptions to the standard return policy exist. In the resale of products we inspect and ensure that all products are in satisfactory condition. Goods are inspected and certified.

Seller Condition: Eligible for Standard Return Policy and additional warranty condition based on grade.
Mattress Condition: "Refurbished" (Eligible for Standard Return Policy)
Seller Condition: (Refurbished 1)
Mattress Condition: "Refurbished" (Eligible for Standard Return Policy and "Mattressfactory.in Certified" warranty conditions)`,
  },
  {
    title: 'SULAKSHMI ENTERPRISE',
    content: `Sulakshmi Enterprise, No-29/2, Studio Road, J.b.kaval, Near Rajkumar Samadhi, Munneshwara Block, Yeshwanthpur Bangalore-560058.
PHONE: 7760693333
CONTACT: info@mattressfactory.in`,
  },
  {
    title: 'GOVERNING LAW',
    content: `These terms and conditions will be governed by and construed in accordance with the laws applicable in INDIA and the terms, conditions and processes are subject to the exclusive jurisdiction of the courts of Bangalore.`,
  },
  {
    title: 'ARBITRATION',
    content: `Any dispute arising would be subjected to binding arbitration with one arbitrator selected by each party and a final arbitrator selected by the two chosen arbitrators. All parties may take Notarial or other notarial and notarial arbitrators. The arbitration proceeding shall be governed by the Arbitration and Conciliation Act 1996 and the language of the arbitration shall be English.`,
  },
  {
    title: 'SEVERABILITY',
    content: `If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.`,
  },
  {
    title: 'INDEMNIFICATION',
    content: `The user agrees to indemnify, defend, hold harmless Mattressfactory.in for any losses, costs, expenses (including reasonable attorney fees) arising in or arising out of the use or misuse or any violation by the website, user's conduct, user's dealings or agreement under violation of any rights of the third party, user violation of any applicable laws, rules or regulations. This clause shall survive the expiry or termination of this User Agreement.`,
  },
  {
    title: 'MODIFICATION OF TERMS AND CONDITIONS',
    content: `Mattressfactory.in reserves all the right to revise these terms and conditions from time to time without notifying the user. The revised terms and conditions would be applicable from the date on which the revised Terms & Conditions are posted online. The user should discontinue using the Service, in case, if the user continues to use the Service, then the user shall be deemed to have agreed to accept and adhere to the revised Terms & Conditions of Use of this Site.`,
  },
  {
    title: 'TERMINATION',
    content: `Mattressfactory.in reserves all the right to suspend or terminate the user's use of its website without giving prior notice, if Mattressfactory.in finds that the User has violated any of the Terms & Conditions of Use of its website. Upon any termination of the User Agreement by either you or Mattressfactory.in, you must immediately destroy all copies of any materials obtained from either Site. For each app license and in no particular you have actually already, to make the time and to process the matter of the notification to through the relationship of the customer to withdraw.`,
  },
  {
    title: 'OBJECTIONABLE MATERIAL',
    content: `There may be some instances, where users are easy to encounter contents that are offensive, abusive, or objectionable to some people. The users may or may not see/access such an illegal or objectionable material on the site or such content at its sole risk and Mattressfactory.in shall not be held liable for the content that appears objectionable or indecent to you.`,
  },
  {
    title: 'DISCLAIMER',
    content: `All necessary endeavors have been made by Mattressfactory.in to ensure that the information provided on the website is correct. Mattressfactory.in, however, makes no warrant to the certainty, reliability, accuracy, and completeness of the information on the website at any point. Mattressfactory.in do make any claim to the Services that could satisfy your particular needs and requirements. The website and Services are provided by Mattressfactory.in on an "as is" basis and Mattressfactory.in shall not be liable to you or any other person or entity for any indirect, incidental, consequential, special or exemplary damages arising from your use or inability to use our website (or the Services or other harmful communications or any other harmful means). Mattressfactory.in makes no claims for any purpose to any representation in respect of the website that may occur including any personal maintenance or a malicious virus beyond the control of Mattressfactory.in.`,
  },
  {
    title: 'LINKS TO 3RD PARTY SITES',
    content: `Mattressfactory.in may contain to websites operated by other companies (3rd party sites). User's use of such third-party sites is not governed by these terms and conditions. The third-party websites are not controlled by Mattressfactory.in and therefore Mattressfactory.in is not responsible for their contents or privacy policy. These links are provided to the user only as a convenience and the inclusion of any link doesn't imply any endorsement by Mattressfactory.in.`,
  },
  {
    title: 'USER CONDUCT AND RULES (GENERAL)',
    content: `The user undertakes not to modify, copy, distribute, transmit, display, perform, reproduce, publish, create, create derivative, nor issue, to create updates, to edit or other actions to change the website or any part of it. By your action, which includes purchasing, downloading, or otherwise using content and any activity including the right of use for any content shall not create any private or other liability under or for any matter under Indian law.

The user acknowledges not to post or publish any defamatory information or material through any means, to post or to encourage encourage such information, to insist, threaten, misrepresent, abusing, malicious, damaging, violates the right right of use, or otherwise encourages conduct that would be seen to a criminal or criminal liability under Indian law.

The user acknowledges not to engage in misleading or unfair trade practices, illegal, illegal, trade mark, mental, sexual, criminal, or similar or similar actions or the behavior shall be in violation of any law or regulation for the protection of law.

The user is not allowed to carry out disruptive activities including but not limited to altering or interfering with the settings or functionality of Mattressfactory.in.

USER CONDUCT – PRE-ORDER (MATTRESS):

The user agrees to ensure accuracy, inadequacy or neglect or any appropriate reliant content or statement about Mattressfactory.in and its associates are partners of any property owned by Mattressfactory.in.

The user has not allowed to engage in collecting information or materials through any means and (of course) means available, to use this website for any commercial use unless our express written consent, creating any links to this website, to use this website to transmit a direct or indirect result of us using parasites, believes, or believes to the performance by receipt of any circumvention beyond any reasonable commercial use to include, but not limited to, and not limited to any direct or indirect cost of any sales, rental, business use of any other property or any use of any property owned or controlled by any party or service from the Mattressfactory.in website and in such cases we may need to cancel your Order and Refund will be processed through the same mode made in 10 to 14 working days.`,
  },
  {
    title: 'UNAUTHORISED OR FRAUDULENT USE',
    content: `As already mentioned in clause 1, the use of Mattressfactory.in is limited to first person who is of at least 18 years of age or above. By continuing to use the website, the user guarantees that he is of 18 years or above. A person below 18 years of age can use the website only under the supervision of a parent/relative or Caregiver. Using the website without compliance with this provision is deemed as unauthorized use of the website. Prohibited activities have been elaborated in the existing as detailed here in clause in full compliance of the rights to the user under the terms and conditions of such effect. Acceptance of such terms and conditions is regarded as fraudulent use by the user and the user is at the legal responsible for any consequence of the action due to such fraudulent use.`,
  },
  {
    title: 'USERS REPRESENTATION',
    content: `User represents that is the information provided by the user during his experience of online placing the order is up to date and correct and consistent, and the set of related and personal details are provided by authorized personnel only. Authorized personnel only provides the user with the understanding that you are a user and not a member of those Products. Based on the user's allergic or medical conditions, some products may be harmful to a user, and in such cases, the user should make a decision and consult a doctor or qualified person(s) in such situations. It becomes your responsibility not to purchase the product which is harmful. Mattressfactory.in would not be held responsible for any level of inadvertently. User access as a result of the use of any product labeled on the website. Also, note that Mattressfactory.in would not be held responsible if any health related problems occur due to consumption of any product from Mattressfactory.in". The products listed on the website are not manufactured by "Mattressfactory.in", however, Mattressfactory.in assumes no liabilities in the event of supplier's problems.`,
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f7f7' }}>

   
        <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2"><Link href="/" className="hover:text-white">Home</Link> › Return Policy</p>
          <h1 className="text-4xl font-bold text-white">Return Policy</h1>
         
        </div>
      </section>

      {/* Content */}
      <div className="w-full px-6 lg:px-20 max-w-screen-xl mx-auto py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-6"
        >
          <h2 className="text-2xl font-extrabold uppercase mb-8" style={{ color: '#092f75' }}>RETURN POLICY</h2>

          <div className="space-y-10">
            {returnSections.map((sec, i) => (
              <div key={i} className={i > 0 ? 'border-t border-gray-100 pt-8' : ''}>
                <h3 className="text-base font-bold mb-3" style={{ color: '#092f75' }}>{sec.title}</h3>
                <p className="text-black text-base leading-relaxed whitespace-pre-line">{sec.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional policy sections */}
        <div className="space-y-6 mb-10">
          {additionalPolicies.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl shadow-sm p-8 md:p-10"
            >
              <h3 className="text-base font-bold mb-4" style={{ color: '#092f75' }}>{sec.title}</h3>
              <p className="text-black text-base leading-relaxed whitespace-pre-line">{sec.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact strip */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { icon: MapPin, title: 'STORE LOCATION', lines: ['Sulakshmi Enterprise No-29/2, Studio Road,', 'J.b.kaval, Near Rajkumar Samadhi,', 'Munneshwara Block, Yeshwanthpur', 'Bangalore- 560058, Karnataka, India'], type: 'address' },
              { icon: Phone, title: 'PHONE', lines: ['+91-7760693333', '+91-9448086545'], type: 'phone' },
              { icon: Mail, title: 'EMAIL', lines: ['info@mattressfactory.in', 'mattressfactory.in@gmail.com'], type: 'email' },
            ].map((col, i) => {
              const Icon = col.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center py-10 px-8 gap-2">
                  <Icon className="w-8 h-8 mb-2" style={{ color: '#092f75' }} />
                  <p className="font-extrabold text-sm text-black">{col.title}</p>
                  {col.lines.map((line, j) => (
                    <p key={j} className={`text-sm ${col.type !== 'address' ? 'font-semibold' : 'text-gray-600'}`} style={col.type !== 'address' ? { color: '#092f75' } : {}}>
                      {col.type === 'email' ? <a href={`mailto:${line}`} className="hover:underline">{line}</a>
                        : col.type === 'phone' ? <a href={`tel:${line}`} className="hover:underline">{line}</a>
                          : line}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </motion.div> */}

      </div>
    </div>
  );
}