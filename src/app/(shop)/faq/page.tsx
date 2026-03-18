'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import bg from '../../../images/bg.jpg';
import Image from "next/image"

const faqs = [
  {
    q: 'DO YOU MAKE MATTRESS OF CUSTOMIZED SIZE?',
    a: 'Yes, we do make mattresses of customized sizes. Please contact us with your required dimensions and we will provide you with a quote. Custom size mattresses may take additional time for manufacturing and delivery.',
  },
  {
    q: 'SHOULD I BUY A HARD OR SOFT MATTRESS?',
    a: 'The choice between a hard or soft mattress depends on your sleeping position and personal preference. Generally, back and stomach sleepers benefit from a firmer mattress for spinal support, while side sleepers often prefer a softer mattress that cushions pressure points like hips and shoulders.',
  },
  {
    q: 'HOW DO I CLEAN MY MATTRESS?',
    a: 'To clean your mattress, vacuum it regularly to remove dust and allergens. For stains, use a mild detergent mixed with cold water and gently blot — never soak. Allow the mattress to air dry completely before putting on sheets. Avoid using harsh chemicals or steam cleaners as these can damage the foam layers.',
  },
  {
    q: 'DO I NEED TO REPLACE MY BASE ALSO?',
    a: 'It is highly recommended that you use your new mattress on a proper, supportive base. An old or worn-out base can affect the comfort and durability of your new mattress. Using an inappropriate base may also void the warranty.',
  },
  {
    q: 'HOW OFTEN SHOULD MATTRESSES BE REPLACED?',
    a: 'Most mattresses should be replaced every 7–10 years, depending on the quality of the mattress and how well it has been maintained. If you notice sagging, discomfort, or wake up with aches and pains, it may be time to consider a replacement.',
  },
  {
    q: 'DO I NEED A NEW MATTRESS?',
    a: 'You may need a new mattress if your current one is more than 7–10 years old, if it has visible sagging or lumps, if you regularly wake up with back pain or stiffness, or if you simply aren\'t sleeping as well as you used to.',
  },
  {
    q: 'WHAT\'S THE RIGHT AMOUNT OF SLEEP?',
    a: 'Adults generally need 7–9 hours of sleep per night. Teenagers need 8–10 hours, and younger children need even more. Consistently getting the right amount of quality sleep is essential for physical health, mental wellbeing, and overall productivity.',
  },
  {
    q: 'WHY IS SLEEP IMPORTANT?',
    a: 'Sleep is vital for physical and mental health. During sleep, your body repairs tissues, consolidates memories, and releases hormones that regulate growth and appetite. Chronic sleep deprivation is linked to a range of health issues including heart disease, diabetes, obesity, and poor mental health.',
  },
  {
    q: 'IS NAPPING GOOD OR BAD?',
    a: 'Short naps of 10–20 minutes can improve alertness, mood, and performance. However, longer naps or napping too late in the day can interfere with nighttime sleep. The best time for a nap is early to mid-afternoon.',
  },
  {
    q: 'DOES THE MATTRESS AFFECT HOW A PERSON SLEEPS?',
    a: 'Absolutely. A good mattress plays a crucial role in sleep quality. It provides the necessary support and comfort for your body, helping to reduce pressure points and maintain spinal alignment. A poor mattress can lead to disturbed sleep, back pain, and fatigue.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS?',
    a: 'The best mattress is one that suits your personal sleep style, body weight, and comfort preferences. Memory foam mattresses are great for pressure relief, orthopedic mattresses support back health, pocket spring mattresses offer bounce and airflow, and hybrid mattresses combine the benefits of both foam and springs.',
  },
  {
    q: 'CAN I VIEW MATTRESS ONLINE OR A REAL STORE?',
    a: 'You can browse and purchase our full range of mattresses on our website www.mattressfactory.in. You can also visit our showroom in Bangalore to see and feel the mattresses in person before making a purchase.',
  },
  {
    q: 'HOW CAN I KNOW, IF I NEED A NEW MATTRESS?',
    a: 'Signs that you need a new mattress include: visible sagging or indentations, waking up with stiffness or pain, allergies worsening due to accumulated dust mites, poor sleep quality, or a mattress that is more than 8–10 years old.',
  },
  {
    q: 'WHAT IS THE BEST TYPE OF MATTRESS FOR A CHILD?',
    a: 'The type of mattress you choose for a child is extremely important because children grow while they sleep. A PLUSH mattress is normally recommended for a child since they weigh less compared to adults and won\'t make a big indentation on the mattress.',
  },
  {
    q: 'WHAT TYPE OF MATTRESS IS RECOMMENDED FOR OVERWEIGHT PEOPLE?',
    a: 'For overweight individuals, a firmer mattress with high-density foam or a strong coil support system is recommended. This ensures adequate support, prevents excessive sinking, and promotes proper spinal alignment. Look for mattresses rated for higher weight capacities.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR PEOPLE WHO SLEEP ON THEIR STOMACHS?',
    a: 'Stomach sleepers generally need a firmer mattress to prevent the hips from sinking too deeply, which can strain the lower back. A medium-firm to firm mattress with good lumbar support is ideal for stomach sleepers.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR A SIDE SLEEPER?',
    a: 'Side sleepers need a mattress that cushions the shoulder and hip while keeping the spine aligned. A medium to medium-soft mattress, such as memory foam or a soft pocket spring mattress, works best for side sleepers.',
  },
  {
    q: 'WHAT MATTRESS IS RECOMMENDED FOR A BAD BACK?',
    a: 'An orthopedic or memory foam mattress with medium-firm support is generally recommended for people with back pain. These mattresses provide targeted support to the lumbar region while relieving pressure on sensitive areas.',
  },
  {
    q: 'WHAT KIND OF QUALITY CHECKS DO YOU HAVE?',
    a: 'All our mattresses go through a rigorous 21-point quality inspection process at our factory. This includes checks on foam density, fabric quality, stitching, structural integrity, dimensions, and comfort layers before dispatch.',
  },
  {
    q: 'DO YOU HAVE A SHOWROOM?',
    a: 'Yes, you can visit our showroom at Sulakshmi Enterprise, No-29/2, Studio Road, J.b.kaval, Near Rajkumar Samadhi, Munneshwara Block, Yeshwanthpur, Bangalore- 560058, Karnataka, India.',
  },
  {
    q: 'WHAT ARE THE BENEFITS TO OWNING A MATTRESS FROM www.mattressfactory.in?',
    a: 'By purchasing directly from Mattressfactory.in, you eliminate the middleman and get factory-direct prices, ensuring maximum value. You also benefit from our warranty, quality assurance, Pan India delivery, and expert customer support.',
  },
  {
    q: 'WHAT IS VISCOELASTIC FOAM?',
    a: 'Viscoelastic foam, commonly known as memory foam, is a type of polyurethane foam that is highly energy absorbent and soft. It molds to the shape of the body in response to heat and pressure, evenly distributing body weight, and then returns to its original shape once the pressure is removed.',
  },
  {
    q: 'WHAT TYPES OF MATTRESSES ARE MANUFACTURED?',
    a: 'We manufacture a wide range of mattresses including Memory Foam, Orthopedic, Coir, Bonnell Spring, Pocket Spring, Euro Top, Latex Foam, Hybrid, and Foam mattresses — available in standard and custom sizes.',
  },
  {
    q: 'WHAT IS THE DIFFERENCE BETWEEN MEMORY FOAM MATTRESS AND DUAL COMFORT MATTRESS?',
    a: 'A memory foam mattress uses viscoelastic foam that contours to your body for pressure relief. A dual comfort mattress offers two different firmness levels on either side — one side firm and one side soft — so you can flip it to suit your comfort preference.',
  },
  {
    q: 'WHY DO OUR MEMORY FOAM MATTRESSES COST SO LOW?',
    a: 'We manufacture all our mattresses in our own factories and sell directly to customers, eliminating the retailer markup. This factory-direct model allows us to offer high-quality memory foam mattresses at significantly lower prices than traditional retail stores.',
  },
  {
    q: 'TELL ME MORE ABOUT THE MATTRESSFACTORY.IN MATTRESSES',
    a: 'Mattressfactory.in mattresses are crafted in our own manufacturing unit in Bangalore using high-quality materials. Each mattress is designed for optimal comfort, durability, and support. We offer a wide range of options to suit different sleeping styles, body types, and budgets — all backed by our warranty.',
  },
  {
    q: 'WHERE ARE THE MATTRESSES SHIPPED FROM?',
    a: 'All our mattresses are manufactured and shipped from our factory in Bangalore, Karnataka. We offer Pan India delivery.',
  },
  {
    q: 'HOW MUCH DOES SHIPPING COST?',
    a: 'We offer free delivery on all standard orders within India. For non-standard or custom-size mattresses, shipping charges may apply. Please contact us for a shipping quote on custom orders.',
  },
  {
    q: 'WHAT IS A SPLIT SIZE MATTRESS',
    a: 'A split size mattress is a mattress that is divided into two halves, allowing each side to have a different firmness level. This is ideal for couples who have different comfort preferences, as each partner can sleep on the firmness that suits them best.',
  },
  {
    q: 'HOW IS LATEX DIFFERENT THAN MEMORY FOAM?',
    a: 'Latex is a natural or synthetic rubber material that is bouncy, responsive, and naturally cooling. Memory foam, on the other hand, is a synthetic foam that conforms closely to the body and retains more heat. Latex offers a more buoyant feel while memory foam provides deeper contouring and pressure relief.',
  },
  {
    q: 'WHY ARE THERE MULTIPLE LAYERS OF FOAM IN MEMORY FOAM AND LATEX FOAM BEDS?',
    a: 'Multiple layers are used to create a balance between comfort and support. The top layers are softer for pressure relief and comfort, while the base layers are firmer to provide structural support and prevent the sleeper from sinking too deep into the mattress.',
  },
  {
    q: 'WHAT IS THE DIFFERENCE BETWEEN TRADITIONAL INNERSPRING MATTRESSES AND FOAM MATTRESSES?',
    a: 'Traditional innerspring mattresses use a network of metal coils for support, offering a bouncy feel and good airflow. Foam mattresses use layers of foam for support and comfort, offering better motion isolation and contouring. Foam mattresses tend to be quieter and better at isolating movement.',
  },
  {
    q: 'HINTS AND TIPS FOR MATTRESS SHOPPING',
    a: 'When shopping for a mattress: consider your sleeping position and body weight, test mattresses in person if possible, check the warranty and return policy, prioritize quality materials over price alone, and give yourself time to adjust — a new mattress can take 30 days to break in.',
  },
  {
    q: 'DO YOU MAKE CUSTOM SIZES?',
    a: 'Yes, we do make mattresses in custom sizes. Please reach out to us at info@mattressfactory.in with your dimensions and we will get back to you with pricing and delivery timelines.',
  },
  {
    q: 'IS THERE AN ADJUSTMENT, OR BREAK-IN, PERIOD?',
    a: 'Yes, most new mattresses require a break-in period of 30 to 60 days. During this time, the materials settle and conform to your body. It is normal to feel slight discomfort initially — this does not indicate a defect in the mattress.',
  },
  {
    q: 'HOW CAN A CONSUMER COMPARE MATTRESSES AT MO OR MORE STORES THAT SELL THE SAME BRAND?',
    a: 'Ask for the model name, specifications, and material breakdown at each store. Compare foam density, coil count (for spring mattresses), cover fabric, and warranty terms. Be cautious of "exclusive" model names that make comparison difficult — ask for the full product details in writing.',
  },
  {
    q: 'HOW DO I PROTECT MY NEW MATTRESS FROM DUST MITES OR MOISTURE?',
    a: 'Use a good quality, waterproof mattress protector from day one. Wash your bedding regularly at high temperatures to kill dust mites. Vacuum your mattress every few months and ensure adequate ventilation in your bedroom.',
  },
  {
    q: 'SHOULD I GIVE MY OLD BEDDING TO MY CHILD OR PUT IT IN MY RENTAL PROPERTY?',
    a: 'It is not advisable to pass on an old mattress to a child or use it in a rental property if it is past its useful life. An old, worn mattress does not provide adequate support and may harbor allergens and dust mites. Always invest in a new mattress for children and rental properties.',
  },
  {
    q: 'HOW MUCH SHOULD I SPEND FOR A BED?',
    a: 'The amount you spend on a bed depends on your budget, preferences, and needs. A quality mattress is an investment in your health and wellbeing. At Mattress Factory, we offer a range of mattresses at various price points to suit every budget, all with the same factory-direct quality.',
  },
  {
    q: 'WHAT IS THE PURPOSE OF FLIPPING AND TURNING THE MATTRESS PERIODICALLY?',
    a: 'Rotating your mattress (head to foot) every 3–6 months helps distribute wear evenly, extending its lifespan. Flipping is only recommended for double-sided mattresses. Regular rotation prevents body impressions from forming on one side.',
  },
  {
    q: 'WHY DON\'T MY LINENS FIT MY NEW MATTRESS?',
    a: 'Modern mattresses tend to be thicker than older models due to additional comfort layers. If your current sheets don\'t fit, you may need deep-pocket sheets designed for mattresses 12 inches or thicker. Check the mattress height and purchase accordingly.',
  },
  {
    q: 'WHAT SHOULD I DO IF THERE IS ODOR COMING FROM MY MATTRESS?',
    a: 'A slight odor when first unpacking a new mattress is normal — this is known as "off-gassing" and is harmless. Allow the mattress to air out for 24–48 hours in a well-ventilated room before use. Sprinkling baking soda and vacuuming it off can also help neutralize odors.',
  },
  {
    q: 'AM I REQUIRED TO ROTATE/FLIP MY MATTRESS?',
    a: 'It is recommended to rotate your mattress 180 degrees every 3–6 months to ensure even wear. Not all mattresses can be flipped — only double-sided mattresses should be flipped. Check the manufacturer\'s guidelines for your specific mattress.',
  },
  {
    q: 'WHAT IS MEMORY FOAM?',
    a: 'Memory foam is a viscoelastic polyurethane foam that responds to body heat and pressure, molding itself to your body\'s contours. It provides exceptional pressure relief and motion isolation, making it a popular choice for people with joint pain or those who share a bed.',
  },
  {
    q: 'WHAT ARE THE BENEFITS OF MEMORY FOAM MATTRESS?',
    a: 'Memory foam mattresses offer excellent pressure point relief, motion isolation (great for couples), support for proper spinal alignment, hypoallergenic properties, and durability. They are particularly beneficial for people with back pain, arthritis, or other joint-related conditions.',
  },
  {
    q: 'HOW DOES MEMORY FOAM WORK?',
    a: 'Memory foam reacts to body heat to soften and mold itself around your body. When pressure is removed, it slowly returns to its original shape — hence the name "memory" foam. This property allows it to evenly distribute body weight and relieve pressure points.',
  },
  {
    q: 'WHAT DO THE DENSITIES OF MEMORY FOAM MEAN?',
    a: 'Foam density is measured in kg/m³. Higher density foam (40 kg/m³ and above) is more durable and provides better support, while lower density foam is softer but wears out faster. High-density foam is generally recommended for long-term use and better body support.',
  },
  {
    q: 'IS LATEX FOAM HOT TO SLEEP ON?',
    a: 'Natural latex is inherently more breathable than memory foam due to its open-cell structure and pin-core design, which allows for better airflow. Most latex mattresses sleep cooler than traditional memory foam mattresses.',
  },
  {
    q: 'IS LATEX A NATURAL PRODUCT?',
    a: 'Natural latex is derived from the sap of rubber trees (Hevea brasiliensis) and is a 100% natural product. Synthetic latex is made from petroleum-based chemicals. Blended latex combines natural and synthetic latex. Always check the product description to know which type you are purchasing.',
  },
  {
    q: 'IS A LATEX MATTRESS GOOD?',
    a: 'Latex mattresses are an excellent choice for those seeking natural materials, responsiveness, durability, and good temperature regulation. They offer a more buoyant feel compared to memory foam and are naturally resistant to dust mites and mold.',
  },
  {
    q: 'WHAT CAUSES PEOPLE TO BE ALLERGIC TO LATEX?',
    a: 'Latex allergies are caused by a sensitivity to proteins found in natural rubber latex. Symptoms can range from mild skin irritation to more serious reactions. If you have a known latex allergy, opt for a synthetic or memory foam mattress instead.',
  },
  {
    q: 'WHAT IS LATEX FOAM?',
    a: 'Latex foam is a mattress material made from natural rubber sap or synthetic alternatives. It is known for its durability, natural resilience, and breathability. Latex foam mattresses offer a springy, responsive feel and are naturally hypoallergenic.',
  },
  {
    q: 'WHAT IS BONNEL SPRING MATTRESS?',
    a: 'A Bonnell spring mattress uses an interconnected network of hourglass-shaped coil springs. It is one of the oldest and most common types of innerspring mattress. Bonnell spring mattresses are durable, supportive, and cost-effective, though they transfer more motion than pocket spring mattresses.',
  },
  {
    q: 'WHAT IS BONNEL COIL SYSTEM IN A MATTRESS?',
    a: 'A Bonnell coil system is a network of interconnected, open coil springs in an hourglass shape. All the springs are connected to each other, which provides firm, even support across the mattress surface. This system is commonly used in entry-level to mid-range innerspring mattresses.',
  },
  {
    q: 'WHAT IS A POCKETED COIL SPRING MATTRESS?',
    a: 'A pocketed coil spring mattress, also known as a pocket spring mattress, uses individually wrapped coil springs that move independently of each other. This design minimizes motion transfer, making it ideal for couples, and provides targeted support to different zones of the body.',
  },
  {
    q: 'WHAT IS A POCKET SPRING MATTRESS?',
    a: 'A pocket spring mattress contains hundreds or thousands of individual springs, each encased in its own fabric pocket. Because each spring moves independently, they provide personalized support and excellent motion isolation. They also promote airflow, keeping the mattress cooler.',
  },
  {
    q: 'WHAT IS AN INNERSPRING MATTRESS?',
    a: 'An innerspring mattress uses a support system of metal coil springs. The springs provide the primary support, and comfort layers of foam or fiber are placed on top. Innerspring mattresses are known for their bounciness, durability, and good airflow.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR BACK AND NECK PAIN?',
    a: 'For back and neck pain, an orthopedic or medium-firm memory foam mattress is often recommended. These mattresses support the natural curvature of the spine, reduce pressure on sensitive areas, and help maintain proper alignment during sleep.',
  },
  {
    q: 'WHAT IS THE BEST MATTRESS FOR BACK PAIN?',
    a: 'A medium-firm orthopedic or memory foam mattress is generally considered the best option for back pain sufferers. It provides the right balance of support and comfort, keeping the spine in a neutral position while relieving pressure points.',
  },
  {
    q: 'ARE FIRM MATTRESSES GOOD FOR SIDE SLEEPERS?',
    a: 'Firm mattresses are generally not recommended for side sleepers, as they do not adequately cushion the hips and shoulders, which can lead to pressure buildup and discomfort. Side sleepers are better suited to medium-soft or soft mattresses that allow the body\'s natural curves to sink in slightly.',
  },
  {
    q: 'IS IT BAD FOR YOU TO SLEEP ON YOUR STOMACH?',
    a: 'Sleeping on your stomach can put strain on the neck and lower back, as it is difficult to maintain a neutral spine position in this posture. If you prefer stomach sleeping, choose a firmer mattress to prevent the hips from sinking and use a thin or no pillow to reduce neck strain.',
  },
  {
    q: 'IS IT BETTER TO SLEEP ON YOUR LEFT OR RIGHT?',
    a: 'Sleeping on your left side is generally considered better for digestion, circulation, and reducing acid reflux. It is also recommended for pregnant women as it improves blood flow. Both sides can be beneficial, but try to avoid sleeping exclusively on one side to prevent imbalanced pressure.',
  },
  {
    q: 'CAN YOU NEGOTIATE THE PRICE OF A MATTRESS?',
    a: 'At Mattress Factory, we offer factory-direct pricing, which means our prices are already the lowest possible without a middleman markup. We periodically offer discounts and festive sale promotions. For bulk orders or special requirements, please contact us and we will do our best to accommodate you.',
  },
];

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.02, 0.4) }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
          open ? 'bg-navy-700 text-white' : 'bg-navy-700 text-white hover:bg-navy-800'
        }`}
      >
        <span className="font-semibold text-sm pr-4">{open ? '− ' : '+ '}{q}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 bg-white text-gray-700 text-sm leading-relaxed border-t border-gray-100">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
     <section className="relative min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14">
          <p className="text-gray-400 text-sm mb-2"><Link href="/" className="hover:text-white">Home</Link> › FAQ</p>
          <h1 className="text-4xl font-bold text-white">FAQ</h1>
         
        </div>
      </section>

      {/* FAQ List */}
      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

       
      </div>
    </div>
  );
}