import Link from 'next/link';
import Image from 'next/image';
import bg from '../../../images/bg.jpg';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; Privacy Policy
          </p>
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
         
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-8 text-gray-700 leading-relaxed">

          {/* Top heading & intro */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">PRIVACY POLICY</h2>
            <p className="mb-3">
              Customers are normally required to provide us with some information in order to help us to improve your shopping experience and comply with your shopping orders. Mattressfactory.in takes the entire necessary endeavor to prevent the misuse of any information. Mattress factory.in understands the importance of privacy and therefore protecting our customer's privacy is our top priority.
            </p>
            <p>
              For the purpose of this privacy policy, the terms "we", "our", "us" "Mattressfactory.In" refers to the owner of Mattressfactory.in and the terms "you", "your", "customer" refers to the user or viewer of the website.
            </p>
          </section>

          {/* Collection and use of information */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Collection and use of information</h2>
            <p>
              While registering or ordering from Mattressfactory.in, you will be required to furnish some information like name, address, postal code, gender, e-mail address, contact number, payment details, payment card details, etc. We may also gather information about your access to our website, no of times you have visited our website, and the services accessed by you at our website. This information is used by us to personalize your shopping experience, to process your transactions, deliver your orders, process payment, and to make communication regarding your order. The contact number and e-mail address are used by us for contacting you for the fulfillment of your order, sending you information and promotional codes, and notifying you about any offers, updates, or new service. This information is also used by Mattressfactory.in, staff and members, who are involved in the completion of your transaction. Apart from personal information, we may also collect browsing data of the user like the IP address, the operating system, type of browser, duration of accessing the website, date, and time when the website has been accessed. This information is used by us for diagnostics purpose which will help us to identify fraudulent use and also help us to prevent your device from fraud.
            </p>
          </section>

          {/* Securing the information */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Securing the information</h2>
            <p>
              A variety of security measures are administered by Mattressfactory.in to ensure that the user's information is protected and is not misused with or exposed to a third party. Mattressfactory.in do not engage in selling, renting, transferring, or trading of personal information to third parties. The personal details collected by us are secured through a secure server and the payment card details are collected by using encryption technology which prevents the hackers from decrypting the details.
            </p>
          </section>

          {/* Disclosure */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Disclosure of personal information to others/exceptional disclosure</h2>
            <p>
              We also collect your data to determine your preferences and choices regarding the products and services of a third party. We disclose your personal information to such a third party if you have consented to it (indicated that you are willing to receive information about the product of the third party). We also disclose your information to other companies who provide services on our behalf like the web servers, customer care, and payment processing and marketing services and these companies would not disclose your information to any third party. If a third party acquires all or any part of our business, whether by way of merger or acquisition or any other means, then the user information would be disclosed to such third party. Apart from this, we may disclose the information if we believe in good faith that such disclosure is necessary for protecting our rights, protecting the security and integrity of the nation, protecting our user interest or right, or for complying with the legal process.
            </p>
          </section>

          {/* Third party links */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Third party links</h2>
            <p>
              Mattressfactory.in may contain links to third party websites (websites controlled by companies other than Mattressfactory.in). The third-party websites are regulated by their respective privacy policy and are not under the control of Mattressfactory.in. Customer willing to access the third party website shall do it at their own discretion and are requested to go through their respective privacy policy. Mattressfactory.in shall not be held responsible for any contents or default arising out of the linked website.
            </p>
          </section>

          {/* Accessing, correcting, and deleting information */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Accessing, correcting, and deleting information</h2>
            <p>
              Mattressfactory.in provides the customer with the option of accessing their personal information stored on the website. Customers may at any time access the information provided by them and update the information in case of inaccuracy. Customer shall also have the option of deleting the stored information, in case they feel their information is not safe with the website.
            </p>
          </section>

          {/* Posting of information in public areas */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Posting of information in public areas</h2>
            <p>
              The information posted by the users in the public areas such as charbox, comment box, or in the online forums of Mattressfactory.in are free to the access of other person and Mattressfactory.in have no control over it. Mattressfactory.in shall not be held responsible for the use of such information by any third party.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Cookies</h2>
            <p>
              Mattressfactory.in use cookies for improving and customizing customer shopping experience. Cookies are a piece of data that is sent by the website and stored in the user web browser. It helps the website to load the user's previous activity anytime when the website is reloaded. Mattressfactory.in uses cookies to keep track of user's activity so that it can recall your given information and preferences, every time when you load the website thereby making your use of the website faster and convenient. The use of cookies may also store your password for accessing the website so that you can automatically be directed to your account on the website. Cookies do not carry viruses nor install malware on the host computer. However, the use of cookies is optional and it is upon the discretion of the user to accept or decline cookies. User may also change their browser setting to decline all or any of the cookies. Accepting the cookie is not essential for accessing Mattressfactory.in, but declining cookies may prevent you from accessing some features of the website thereby restricting your use of the site.
            </p>
          </section>

          {/* Web beacon */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Web beacon</h2>
            <p>
              A web beacon, also known as a pixel tag or web bug is a transparent graphic image used in combination with cookies to observe the behavior of the user of the website. The web page contains a web beacon that would enable us to count the users visiting the page in order to deliver co-branded services. These web beacons collect limited information like the page on which it resides, cookie number, time, and date of a page view and do not collect any personal information. Web beacons would be declined automatically by declining the use of cookies. The web beacons on Mattressfactory.in are not permitted for use by a third party.
            </p>
          </section>

          {/* User consent */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">User consent</h2>
            <p>
              By continuing to use Mattressfactory.in and providing us with your information, you consent to our privacy policy and permit us to use your information in the manner set in Mattressfactory.in the privacy policy.
            </p>
          </section>

          {/* Changes to the privacy policy */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Changes to the privacy policy</h2>
            <p>
              Mattressfactory.in reserves all the right to make changes in the privacy policy without prior notice to the user. Such changes will be posted on this page and will come to effect on the date of posting of such changes on the privacy policy page. Mattressfactory.in assuring that such changes would not lessen the protection promised to the users for securing their privacy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-navy-700 mb-4">Contact</h2>
            <p className="mb-4">
              If you have any queries regarding the privacy policy or feedback or suggestion, feel free to contact us at{' '}
              <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">
                info@mattressfactory.in
              </a>
            </p>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="font-bold text-navy-700 mb-1">Mattress Factory – Sulakshmi Enterprise</p>
              <p>No-29/2, Studio Road, J.B. Kaval, Near Rajkumar Samadhi,</p>
              <p>Munneshwara Block, Yeshwanthpur Bangalore – 560058, Karnataka, India</p>
              <p className="mt-2">
                Email:{' '}
                <a href="mailto:info@mattressfactory.in" className="text-navy-700 font-semibold hover:underline">info@mattressfactory.in</a>
                {' '}|{' '}
                <a href="mailto:mattressfactory.in@gmail.com" className="text-navy-700 font-semibold hover:underline">mattressfactory.in@gmail.com</a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+917760693333" className="text-navy-700 font-semibold hover:underline">+91-7760693333</a>
                {' '}|{' '}
                <a href="tel:+919448086545" className="text-navy-700 font-semibold hover:underline">+91-9448086545</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}