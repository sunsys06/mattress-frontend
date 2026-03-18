import Link from 'next/link';
import Image from 'next/image';
import bg from '../../../images/bg.jpg';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2">
            <Link href="/" className="hover:text-white">Home</Link> › Terms and Conditions
          </p>
          <h1 className="text-4xl font-bold text-white">Terms &amp; Conditions of Use</h1>
         
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed">

          {/* TERMS & CONDITIONS OF USE heading */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-navy-700 mb-6">TERMS &amp; CONDITIONS OF USE</h2>
          </div>

          {/* INFRINGEMENT POLICY */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">INFRINGEMENT POLICY</h2>
            <p className="mb-4">
              This IP Infringement Policy intends to stay in consonance with the Terms &amp; Conditions and our Privacy Policy.
            </p>
            <p className="mb-4">
              All the elements such as logos, text, graphics, software programs, animated files, user names, user interfaces, and our entire layouts, images, are displayed on the <strong>www.mattressfactory.in</strong> the Website is the exclusive property of "Mattress factory" as we reserve all the intellectual property rights. It belongs to our unique presence on our site; registration, which insures, unique website, we distribute and carry content from the website belonging to "Mattress Factory". The use of the material does not entitle the user to make or use unauthorized use of any personal content; know that use the Mattress factory's. Access to the website does not grant the user any license, express or implied, to the intellectual property of the "Mattress factory" or its business.
            </p>
            <p className="mb-4">
              "Mattress factory" accepts the intellectual property rights of others. It does not infer that any content displayed on the website infringes a third-party person or any person or any person or the person shall have no right to receive the content and shall not be prejudiced to receive. A violation of this right constitutes a serious infringement and therefore a violation of all requirements of Independent Security along with additional criminal law.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Your contact information including your name, address, telephone number, email address.</li>
              <li>A digital signature or your written signature or on behalf of the person whose intellectual property rights have been infringed and is verified.</li>
              <li>Identification of the work which is believed to infringe, describing it in sufficient detail.</li>
              <li>A request that the infringement be removed or access be disabled.</li>
              <li>The details of the Alleged subject matter and a description as to how the alleged subject matter is infringing.</li>
              <li>A statement that the information provided, which in good faith the user alleges, is subject to the listed intellectual property rights.</li>
            </ul>
            <p>
              The contact information in the inquiry to be in order to verify the genuineness of the claim is required to be received by the administration at <strong>info@mattressfactory.in</strong>. If you are able to confirm, then the order to protect the alleged intellectual property or the alleged protected party are taken, or if the actions taken by us are of the reasonable.
            </p>
          </section>

          {/* NOTICE */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">NOTICE</h2>
            <p className="mb-4">
              All notices or legal rights will be sent to their website or will be posted on the website. The users, who in future might have a future access with the purchase of a service, will be notifying to such legal process in actual provided, Since, notices are not intended for the features to be Date or URL after transmission of properly authorized or by intended be accepted.
            </p>
            <p className="mb-4">In case of any queries, the user can contact at:<br /><strong>info@mattressfactory.in</strong></p>
            <div className="bg-gray-50 rounded-xl p-5 mt-3">
              <p className="font-bold text-navy-700 mb-1">SULAKSHMI ENTERPRISE</p>
              <p>NO-29/2, STUDIO ROAD, J.B.KAVAL, NEAR RAJKUMAR SAMADHI,</p>
              <p>MUNNESHWARA BLOCK, YESHWANTHPUR BANGALORE-560058,</p>
              <p>KARNATAKA, INDIA</p>
              <p>PHONE/EMAIL: 9448086545</p>
            </div>
          </section>

          {/* GOVERNING LAW */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">GOVERNING LAW</h2>
            <p className="mb-4">
              This clause shall be subject to introduction or expiration of this agreement.
            </p>
            <p className="font-semibold text-navy-700 mb-2">ARBITRATION:</p>
            <p className="mb-4">
              These terms and conditions will be governed by and construed in accordance with the laws applicable in INDIA and the terms, conditions and processes are subject to the exclusive jurisdiction of the courts of Bangalore.
            </p>
            <p className="font-semibold text-navy-700 mb-2">ARBITRATION:</p>
            <p>
              Any dispute arising would be subjected to binding arbitration with one arbitrator selected by each party and a final arbitrator selected by the two chosen arbitrators. All parties may take Notarial or other notarial arbitrators. The arbitration proceeding shall be governed by the Arbitration and Conciliation Act 1996 and the language of the arbitration shall be English.
            </p>
          </section>

          {/* SEVERABILITY */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">SEVERABILITY</h2>
            <p>
              If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.
            </p>
          </section>

          {/* INDEMNIFICATION */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">INDEMNIFICATION</h2>
            <p>
              The user agrees to indemnify, defend, hold harmless Mattressfactory.in for any losses, costs, expenses (including reasonable attorney fees) arising in or arising out of the use or misuse or any violation by the website, user's conduct, user's dealings or agreement under violation of any rights of the third party, user violation of any applicable laws, rules or regulations. This clause shall survive the expiry or termination of this User Agreement.
            </p>
          </section>

          {/* MODIFICATION OF TERMS AND CONDITIONS */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">MODIFICATION OF TERMS AND CONDITIONS</h2>
            <p>
              Mattressfactory.in reserves all the right to revise these terms and conditions from time to time without notifying the user. The revised terms and conditions would be applicable from the date on which the revised Terms &amp; Conditions are posted online. The user should discontinue using the Service, in case, if the user continues to use the Service, then the user shall be deemed to have agreed to accept and adhere to the revised Terms &amp; Conditions of Use of this Site.
            </p>
          </section>

          {/* TERMINATION */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">TERMINATION</h2>
            <p>
              Mattressfactory.in reserves all the right to suspend or terminate the user's use of its website without giving prior notice, if Mattressfactory.in finds that the User has violated any of the Terms &amp; Conditions of Use of its website. Upon any termination of the User Agreement by either you or Mattressfactory.in, you must immediately destroy all copies of any materials obtained from either Site. For each app license and in no particular you have actually already, to make the time and to process the matter of the notification to through the relationship of the customer to withdraw.
            </p>
          </section>

          {/* OBJECTIONABLE MATERIAL */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">OBJECTIONABLE MATERIAL</h2>
            <p>
              There may be some instances, where users are easy to encounter contents that are offensive, abusive, or objectionable to some person. The users may or may not see/access such an illegal or objectionable material on the site or such content at its sole risk and Mattressfactory.in shall not be held liable for the content that appears objectionable or indecent to you.
            </p>
          </section>

          {/* DISCLAIMER */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">DISCLAIMER</h2>
            <p>
              All necessary endeavors have been made by Mattressfactory.in to ensure that the information provided on the website is correct. Mattressfactory.in, however, makes no warrant to the certainty, reliability, accuracy, and completeness of the information on the website at any point. Mattressfactory.in do make any claim to the Services that could satisfy your particular needs and requirements. The website and Services are provided by Mattressfactory.in on an "as is" basis and Mattressfactory.in shall not be liable to you or any other person or entity for any indirect, incidental, consequential, special or exemplary damages arising from your use or inability to use our website (or the Services or other harmful communications or any other harmful means). Mattressfactory.in makes no claims for any purpose to any representation in respect of the website that may occur including any personal maintenance or a malicious virus beyond the control of Mattressfactory.in.
            </p>
          </section>

          {/* LINKS TO 3RD PARTY SITES */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">LINKS TO 3RD PARTY SITES</h2>
            <p>
              Mattressfactory.in may contain to websites operated by other companies (3rd party sites). User's use of such third-party sites is not governed by these terms and conditions. The third-party websites are not controlled by Mattressfactory.in and therefore Mattressfactory.in is not responsible for their contents or privacy policy. These links are provided to the user only as a convenience and the inclusion of any link doesn't imply any endorsement by Mattressfactory.in.
            </p>
          </section>

          {/* USER CONDUCT AND RULES (GENERAL) */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">USER CONDUCT AND RULES (GENERAL)</h2>
            <p className="mb-4">
              The user undertakes not to modify, copy, distribute, transmit, display, perform, reproduce, publish, create, create derivative, nor issue, to create updates, to edit or other actions to change the website or any part of it. By your action, which includes purchasing, downloading, or otherwise using content and any activity including the right of use for any content shall not create any private or other liability under or for any matter under Indian law.
            </p>
            <p className="mb-4">
              The user acknowledges not to post or publish any defamatory information or material through any means, to post or to encourage encourage such information, to insist, threaten, misrepresent, abusing, malicious, damaging, violates the right right of use, or otherwise encourages conduct that would be seen to a criminal or criminal liability under Indian law.
            </p>
            <p className="mb-4">
              The user agrees to violate about, inadequacy or neglect any terms and conditions of this agreement or any code of protocol or another guideline as provided under the terms.
            </p>
            <p className="mb-4">
              The user undertakes not to make any defamatory, derogatory, abusive, inappropriate, indecent content or statement about Mattressfactory.in and its associates are partners on any property owned by Mattressfactory.in.
            </p>
            <p className="mb-4">
              The user has not allowed to attempt to collect information or materials through any means and (of course) means available to use this website for any commercial use unless our express written consent, creating any links to this website, to use this website to transmit a direct or indirect result of us using parasites, believes, or believes to the performance by receipt of any circumvention beyond any reasonable commercial use to include, but not limited to, and not limited to any direct or indirect cost of any sales, rental, business use of any other property or any use of any property owned or controlled by any party or service from the Mattressfactory.in website and in such cases we may need to cancel your Order and Refund will be processed through the same mode made in 10 to 14 working days.
            </p>
            <p className="font-semibold text-navy-700 mb-2">USER CONDUCT – PRE-ORDER (MATTRESS):</p>
            <p>
              The user agrees to ensure accuracy, inadequacy or neglect or any appropriate reliant content or statement about Mattressfactory.in and its associates are partners of any property owned by Mattressfactory.in.
            </p>
          </section>

          {/* UNAUTHORISED OR FRAUDULENT USE */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">UNAUTHORISED OR FRAUDULENT USE</h2>
            <p>
              As already mentioned in clause 1, the use of Mattressfactory.in is limited to first person who is of at least 18 years of age or above. By continuing to use the website, the user guarantees that he is of 18 years or above. A person below 18 years of age can use the website only under the supervision of a parent/relative or Caregiver. Using the website without compliance with this provision is deemed as unauthorized use of the website. Prohibited activities have been elaborated in the existing as detailed here in clause in full compliance of the rights to the user under the terms and conditions of such effect. Acceptance of such terms and conditions is regarded as fraudulent use by the user and the user is at the legal responsible for any consequence of the action due to such fraudulent use.
            </p>
          </section>

          {/* USERS REPRESENTATION */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">USERS REPRESENTATION</h2>
            <p>
              User represents that is the information provided by the user during his experience of online placing the order is up to date and correct and consistent, and the set of related and personal details are provided by authorized personnel only. Authorized personnel only provides the user with the understanding that you are a user and not a member of those Products. Based on the user's allergic or medical conditions, some products may be harmful to a user, and in such cases, the user should make a decision and consult a doctor or qualified person(s) in such situations. It becomes your responsibility not to purchase the product which is harmful. Mattressfactory.in would not be held responsible for any level of inadvertently. User access as a result of the use of any product labeled on the website. Also, note that Mattressfactory.in would not be held responsible if any health related problems occur due to consumption of any product from "Mattressfactory.in". The products listed on the website are not manufactured by "Mattressfactory.in", however, Mattressfactory.in assumes no liabilities in the event of supplier's problems.
            </p>
          </section>

          {/* PRICING AND TERMS OF PAYMENT */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">PRICING AND TERMS OF PAYMENT</h2>
            <p className="mb-4">
              All the products listed on our website will be sold at the prices mentioned on the website. All the prices are in Indian currency (i.e. rupees). Unless stated otherwise, the service prices on the website are exclusive of shipping and returns charges. The user agrees to make full payment of purchase or contract obligations when required to protect the specified or given price to the purchase order. Mattressfactory.in reserves the right to make adjustments to the quoted price on the basis of applicable legal requirements, tax regulations, or errors. The user acknowledges that the Products or Services will be provided in accordance with such contract descriptions or specifications of the purchase order as applicable to our website or which are on the said purchase order. The user should notify us if this does not fulfill the order. Additionally, Mattressfactory.in shall be responsible to update the price on the website or any additional cost if and when applicable. Please note that prices change subject to fluctuations based on the product and price market.
            </p>
            <p>
              Mattressfactory.in reserves all the right to change the prices for the services of the product at its discretion. Owing to price balance, the user assumes in the event of any price change without notice, we do not admit any claim for existing orders to exchange price. Mattressfactory.in has the right to process the whole order to address the exchange of the currency. When placing the order, the payment shall be made as per this.
            </p>
          </section>

          {/* ACCOUNT PASSWORD AND SECURITY */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">ACCOUNT PASSWORD AND SECURITY</h2>
            <p>
              The user may be required to register and sign in to your account with the website. The user should take all the necessary measures to adequately protect his own account. The user shall be responsible for all registered information for all activities that occur under the user's account. The user agrees to immediately notify Mattressfactory.in of any unauthorized use of the account of password. In case of any damage or loss derived from the user's failure to comply with this provision, Mattressfactory.in shall not be held liable.
            </p>
          </section>

          {/* ELIGIBILITY CRITERIA */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">ELIGIBILITY CRITERIA</h2>
            <p>
              The use of the website is limited to person(s) who are above the age of 18 years and are capable of forming a contract under the Indian Contract Act, 1872. By agreeing to use the website, the user confirms that you are above 18 years of age. In case you are below 18 years, a parent or legal representative of such a minor may access the website if they do not allow the supervision or a parent or legal guardian can provide their such parent or guardian accepts the terms and conditions.
            </p>
          </section>

          {/* SERVICES OVERVIEW */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">SERVICES OVERVIEW</h2>
            <p>
              The website "Mattressfactory.in" is operated by "OZIRID". The website "Mattressfactory.in" is a one-stop-shop provider to reach Certified Mattressfactory.in is an online store that gives you an online shopping and delivery service businesses, IP trust, and other Company Accessories. Besides, the services shall include home delivery tech Support and warranty services as per company terms.
            </p>
          </section>

          {/* INTRODUCTION */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">INTRODUCTION</h2>
            <p>
              The following terms and conditions regulate the use of this website. By continuing to use the website you agree that you have read, understood, and are bound by the terms and conditions. You disagree with any portion of these terms, you may not continue to use the website. By using the Service, the user, "Mattress factory.in" or, us refer to the name of the website, and the term you refers to the user of the Service of their website.
            </p>
          </section>

          {/* Contact box */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Contact Us</h2>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="font-bold text-navy-700 mb-1">Mattress Factory – Sulakshmi Enterprise</p>
              <p>No-29/2, Studio Road, J.B. Kaval, Near Rajkumar Samadhi,</p>
              <p>Munneshwara Block, Yeshwanthpur Bangalore – 560058, Karnataka, India</p>
              <p className="mt-2">Email: <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">info@mattressfactory.in</a></p>
              <p>Phone: <a href="tel:+917760693333" className="text-navy-700 font-semibold hover:underline">+91 77606 93333</a> | <a href="tel:+919448086545" className="text-navy-700 font-semibold hover:underline">+91 94480 86545</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}