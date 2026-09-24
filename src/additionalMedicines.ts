export type AdditionalMedicine = {
  name: string;
  detail: string;
  price: string;
  tone: 'green' | 'peach' | 'blue';
  image: string;
  categories: string[];
  description: string;
  take: string;
  when: string;
  pros: string[];
  cons: string[];
  treats: string[];
};

const images = {
  pain: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&q=80',
  allergy: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80',
  vitamin: 'https://images.unsplash.com/photo-1616671276441-2f7aeae7c7e1?auto=format&fit=crop&w=700&q=80',
  digestive: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=700&q=80',
  firstAid: 'https://images.unsplash.com/photo-1603398938378-e54eab446ece?auto=format&fit=crop&w=700&q=80',
};

function imageFor(categories: string[]) {
  if (categories.includes('First aid')) return images.firstAid;
  if (categories.includes('Digestive health')) return images.digestive;
  if (categories.includes('Cold & allergy')) return images.allergy;
  if (categories.includes('Vitamins')) return images.vitamin;
  return images.pain;
}

function medicine(name: string, detail: string, price: string, categories: string[], treats: string[], tone: AdditionalMedicine['tone'] = 'green'): AdditionalMedicine {
  return {
    name,
    detail,
    price,
    tone,
    image: imageFor(categories),
    categories,
    description: `${name} is listed for general wellness and symptom support. Read the package label and confirm that it is suitable for you with a pharmacist or doctor.`,
    take: 'Take only according to the package directions or advice from a qualified healthcare professional. Take with water unless the label says otherwise.',
    when: 'Use at the time and frequency stated on the package. Do not take more often or for longer than recommended.',
    pros: ['Convenient everyday support', 'Clear package directions'],
    cons: ['May not be suitable for everyone', 'Possible side effects or medicine interactions'],
    treats,
  };
}

export const additionalMedicines: AdditionalMedicine[] = [
  medicine('Ibuprofen 200mg', 'Anti-inflammatory pain relief', '$7.25', ['Pain relief'], ['Headache', 'Period pain', 'Muscle aches'], 'peach'),
  medicine('Ibuprofen Gel', 'Targeted muscle comfort', '$10.50', ['Pain relief', 'First aid'], ['Sprains', 'Muscle aches', 'Joint pain'], 'blue'),
  medicine('Aspirin 300mg', 'Pain and fever support', '$5.95', ['Pain relief'], ['Headache', 'Fever', 'Toothache'], 'peach'),
  medicine('Naproxen Gel', 'Topical joint comfort', '$11.00', ['Pain relief'], ['Joint pain', 'Muscle aches'], 'blue'),
  medicine('Heat Relief Patch', 'Long-lasting muscle warmth', '$8.50', ['Pain relief', 'First aid'], ['Muscle tension', 'Back discomfort'], 'peach'),
  medicine('Cold Relief Tablets', 'Multi-symptom cold support', '$9.50', ['Cold & allergy'], ['Blocked nose', 'Sore throat', 'Fever'], 'blue'),
  medicine('Sore Throat Lozenges', 'Soothing throat relief', '$5.50', ['Cold & allergy', 'First aid'], ['Sore throat', 'Throat irritation'], 'green'),
  medicine('Saline Nasal Spray', 'Gentle nasal moisture', '$7.80', ['Cold & allergy'], ['Dry nose', 'Nasal congestion'], 'blue'),
  medicine('Menthol Chest Rub', 'Cooling vapour comfort', '$8.25', ['Cold & allergy'], ['Blocked nose', 'Cold discomfort'], 'green'),
  medicine('Cough Suppressant Syrup', 'Dry cough support', '$12.25', ['Cold & allergy'], ['Dry cough', 'Throat irritation'], 'peach'),
  medicine('Expectorant Syrup', 'Chest congestion support', '$13.00', ['Cold & allergy'], ['Chest congestion', 'Wet cough'], 'blue'),
  medicine('Honey Lemon Drops', 'Soothing throat sweets', '$4.75', ['Cold & allergy'], ['Throat irritation', 'Cough discomfort'], 'peach'),
  medicine('Loratadine 10mg', 'Daily allergy relief', '$8.95', ['Cold & allergy'], ['Hay fever', 'Hives', 'Itching'], 'blue'),
  medicine('Fexofenadine 120mg', 'Non-drowsy antihistamine', '$13.50', ['Cold & allergy'], ['Hay fever', 'Runny nose', 'Itchy eyes'], 'green'),
  medicine('Chlorphenamine Tablets', 'Short-term allergy support', '$7.40', ['Cold & allergy'], ['Sneezing', 'Runny nose', 'Itching'], 'peach'),
  medicine('Eye Allergy Drops', 'Itchy eye comfort', '$11.75', ['Cold & allergy'], ['Watery eyes', 'Itchy eyes'], 'blue'),
  medicine('Nasal Decongestant Spray', 'Short-term blocked nose relief', '$10.25', ['Cold & allergy'], ['Nasal congestion'], 'green'),
  medicine('Eucalyptus Inhalant', 'Refreshing nasal vapour', '$6.80', ['Cold & allergy'], ['Blocked nose', 'Cold discomfort'], 'peach'),
  medicine('Vitamin D3 1000IU', 'Daily vitamin D support', '$10.00', ['Vitamins'], ['Vitamin D deficiency support', 'General wellness'], 'green'),
  medicine('Vitamin B Complex', 'B vitamin blend', '$14.00', ['Vitamins'], ['Nutritional deficiency support', 'General wellness'], 'blue'),
  medicine('Multivitamin Tablets', 'Broad daily nutrition', '$16.50', ['Vitamins'], ['Nutritional deficiency support', 'General wellness'], 'green'),
  medicine('Iron Gentle 14mg', 'Iron nutrition support', '$15.25', ['Vitamins'], ['Iron deficiency support'], 'peach'),
  medicine('Magnesium Citrate', 'Magnesium supplement', '$13.75', ['Vitamins', 'Digestive health'], ['Magnesium deficiency support', 'Occasional constipation'], 'blue'),
  medicine('Calcium + Vitamin D', 'Bone nutrition support', '$17.00', ['Vitamins'], ['Calcium deficiency support', 'Bone health support'], 'green'),
  medicine('Omega 3 Capsules', 'Fish oil supplement', '$19.50', ['Vitamins'], ['General wellness', 'Nutritional support'], 'blue'),
  medicine('Probiotic Capsules', 'Digestive flora support', '$21.00', ['Vitamins', 'Digestive health'], ['Digestive wellness', 'Nutritional support'], 'green'),
  medicine('Elderberry Gummies', 'Berry wellness supplement', '$15.50', ['Vitamins', 'Cold & allergy'], ['General wellness', 'Nutritional support'], 'peach'),
  medicine('Electrolyte Sachets', 'Hydration support', '$9.75', ['Vitamins', 'Digestive health'], ['Dehydration support', 'Recovery support'], 'blue'),
  medicine('Vitamin E Capsules', 'Antioxidant supplement', '$12.75', ['Vitamins'], ['Vitamin E deficiency support', 'General wellness'], 'green'),
  medicine('Folic Acid 400mcg', 'Folate nutrition support', '$7.25', ['Vitamins'], ['Folate deficiency support'], 'peach'),
  medicine('Lactase Enzyme', 'Dairy digestion support', '$12.50', ['Digestive health'], ['Lactose intolerance symptoms', 'Bloating'], 'blue'),
  medicine('Gaviscon Liquid', 'Reflux barrier support', '$11.50', ['Digestive health'], ['Heartburn', 'Acid reflux'], 'green'),
  medicine('Famotidine Tablets', 'Acid reduction support', '$10.75', ['Digestive health'], ['Heartburn', 'Acid discomfort'], 'peach'),
  medicine('Motion Sickness Tablets', 'Travel nausea support', '$8.25', ['Digestive health'], ['Motion sickness', 'Nausea'], 'blue'),
  medicine('Oral Rehydration Salts', 'Fluid and salt replacement', '$6.25', ['Digestive health', 'Vitamins'], ['Dehydration support', 'Fluid loss'], 'green'),
  medicine('Fibre Supplement', 'Gentle fibre support', '$13.25', ['Digestive health'], ['Constipation', 'Low fibre intake'], 'peach'),
  medicine('Stool Softener', 'Short-term bowel support', '$9.25', ['Digestive health'], ['Constipation'], 'blue'),
  medicine('Senna Tablets', 'Short-term constipation relief', '$6.95', ['Digestive health'], ['Constipation'], 'green'),
  medicine('Loperamide Capsules', 'Diarrhoea symptom control', '$8.50', ['Digestive health'], ['Short-term diarrhoea'], 'peach'),
  medicine('Ginger Nausea Chews', 'Ginger digestive comfort', '$7.75', ['Digestive health'], ['Mild nausea', 'Travel discomfort'], 'blue'),
  medicine('Peppermint Oil Capsules', 'Bloating comfort', '$14.25', ['Digestive health'], ['Bloating', 'Digestive discomfort'], 'green'),
  medicine('Zinc Oxide Cream', 'Protective skin barrier', '$7.50', ['First aid'], ['Minor skin irritation', 'Chafing'], 'peach'),
  medicine('Hydrocortisone 1% Cream', 'Itch and inflammation support', '$9.95', ['First aid'], ['Minor rash', 'Itching', 'Insect bites'], 'blue'),
  medicine('Calamine Lotion', 'Cooling skin comfort', '$6.75', ['First aid'], ['Itching', 'Minor rash', 'Sun discomfort'], 'green'),
  medicine('Antiseptic Liquid', 'Minor wound cleaning', '$5.25', ['First aid'], ['Minor cuts', 'Grazes'], 'peach'),
  medicine('Antiseptic Wipes', 'Portable wound cleaning', '$4.95', ['First aid'], ['Minor cuts', 'Grazes'], 'blue'),
  medicine('Adhesive Plasters', 'Everyday wound covering', '$4.50', ['First aid'], ['Minor cuts', 'Blisters'], 'green'),
  medicine('Sterile Gauze Pads', 'Sterile wound dressing', '$7.25', ['First aid'], ['Minor cuts', 'Grazes'], 'peach'),
  medicine('Elastic Support Bandage', 'Light joint support', '$8.75', ['First aid', 'Pain relief'], ['Sprains', 'Joint support'], 'blue'),
  medicine('Instant Cold Pack', 'First aid cooling pack', '$5.75', ['First aid', 'Pain relief'], ['Swelling', 'Minor bumps'], 'green'),
  medicine('Burn Relief Gel', 'Cooling minor burn care', '$9.50', ['First aid'], ['Minor superficial burns'], 'peach'),
  medicine('Aloe Vera Gel', 'Cooling skin moisturiser', '$8.50', ['First aid'], ['Sun discomfort', 'Dry skin'], 'blue'),
  medicine('Lip Balm SPF', 'Protective lip care', '$6.25', ['First aid'], ['Dry lips', 'Sun exposure'], 'green'),
  medicine('Sunscreen SPF30', 'Daily UV protection', '$15.00', ['First aid'], ['Sun protection', 'Sunburn prevention'], 'peach'),
  medicine('Hand Sanitiser Gel', 'On-the-go hand hygiene', '$4.25', ['First aid'], ['Hand hygiene support'], 'blue'),
  medicine('Digital Thermometer', 'Temperature monitoring', '$12.00', ['First aid'], ['Temperature monitoring'], 'green'),
  medicine('Eye Wash Solution', 'Gentle eye rinse', '$8.25', ['First aid'], ['Dust irritation', 'Eye rinsing'], 'peach'),
  medicine('Ear Drops', 'Earwax care support', '$9.75', ['First aid'], ['Earwax build-up'], 'blue'),
  medicine('Saline Wound Wash', 'Gentle wound rinse', '$7.95', ['First aid'], ['Minor cuts', 'Grazes'], 'green'),
  medicine('Mouth Ulcer Gel', 'Local mouth comfort', '$10.25', ['First aid'], ['Mouth ulcers', 'Mouth irritation'], 'peach'),
  medicine('Dental Floss Picks', 'Daily oral care', '$5.50', ['First aid'], ['Dental hygiene support'], 'blue'),
  medicine('Fluoride Toothpaste', 'Cavity prevention care', '$5.95', ['First aid'], ['Cavity prevention', 'Dental hygiene'], 'green'),
  medicine('Kids Paracetamol Syrup', 'Child fever support', '$8.95', ['Pain relief', 'Cold & allergy'], ['Fever', 'Minor aches'], 'peach'),
  medicine('Children\'s Ibuprofen Syrup', 'Child pain support', '$9.50', ['Pain relief', 'Cold & allergy'], ['Fever', 'Minor aches'], 'blue'),
  medicine('Baby Saline Drops', 'Gentle infant nasal care', '$7.25', ['Cold & allergy'], ['Nasal congestion'], 'green'),
  medicine('Pregnancy Multivitamin', 'Pregnancy nutrition support', '$22.00', ['Vitamins'], ['Pregnancy nutritional support'], 'peach'),
  medicine('Menopause Support Vitamins', 'Wellness nutrition blend', '$20.00', ['Vitamins'], ['General menopause wellness'], 'blue'),
  medicine('Coenzyme Q10', 'Energy metabolism supplement', '$24.00', ['Vitamins'], ['General wellness', 'Nutritional support'], 'green'),
  medicine('Biotin Hair Support', 'Biotin supplement', '$18.50', ['Vitamins'], ['Biotin deficiency support'], 'peach'),
  medicine('Collagen Peptides', 'Protein supplement', '$26.00', ['Vitamins'], ['General nutrition support'], 'blue'),
  medicine('Glucosamine Capsules', 'Joint nutrition support', '$23.50', ['Vitamins', 'Pain relief'], ['Joint wellness', 'Nutritional support'], 'green'),
  medicine('Turmeric Capsules', 'Herbal wellness support', '$17.75', ['Vitamins', 'Pain relief'], ['General wellness', 'Joint wellness'], 'peach'),
  medicine('Chamomile Tea Bags', 'Calming herbal drink', '$6.50', ['Vitamins', 'Digestive health'], ['Relaxation support', 'Digestive comfort'], 'blue'),
  medicine('Valerian Root Tablets', 'Sleep routine support', '$14.75', ['Vitamins'], ['Sleep routine support'], 'green'),
  medicine('Melatonin 2mg', 'Sleep routine supplement', '$16.25', ['Vitamins'], ['Sleep routine support'], 'peach'),
  medicine('CoQ10 Gummies', 'Chewable wellness supplement', '$18.75', ['Vitamins'], ['General wellness'], 'blue'),
  medicine('Potassium Electrolytes', 'Electrolyte nutrition support', '$11.25', ['Vitamins', 'Digestive health'], ['Hydration support', 'Nutritional support'], 'green'),
  medicine('Glucose Energy Tablets', 'Quick carbohydrate support', '$5.75', ['Vitamins'], ['Low blood sugar support'], 'peach'),
  medicine('Protein Recovery Shake', 'Post-activity nutrition', '$22.50', ['Vitamins'], ['Recovery nutrition', 'Protein support'], 'blue'),
  medicine('Breakfast Fibre Bars', 'Fibre snack support', '$10.95', ['Vitamins', 'Digestive health'], ['Fibre intake support', 'Digestive wellness'], 'green'),
  medicine('Low Sugar Multivitamin', 'Sugar-conscious daily vitamins', '$17.50', ['Vitamins'], ['Nutritional deficiency support'], 'peach'),
  medicine('Vitamin A Capsules', 'Vitamin A nutrition support', '$12.25', ['Vitamins'], ['Vitamin A deficiency support'], 'blue'),
  medicine('Vitamin K2 + D3', 'Bone nutrition blend', '$19.25', ['Vitamins'], ['Bone health support', 'Nutritional support'], 'green'),
  medicine('Selenium Tablets', 'Trace mineral support', '$10.50', ['Vitamins'], ['Selenium deficiency support'], 'peach'),
  medicine('Chromium Tablets', 'Mineral nutrition support', '$13.50', ['Vitamins'], ['Chromium deficiency support'], 'blue'),
  medicine('B12 Sublingual Tablets', 'B12 nutrition support', '$14.50', ['Vitamins'], ['Vitamin B12 deficiency support'], 'green'),
  medicine('Digestive Enzyme Blend', 'Meal digestion support', '$20.50', ['Digestive health', 'Vitamins'], ['Digestive wellness', 'Bloating'], 'peach'),
  medicine('Activated Charcoal Capsules', 'Digestive emergency support', '$9.75', ['Digestive health'], ['Digestive discomfort'], 'blue'),
  medicine('Bismuth Stomach Relief', 'Stomach upset support', '$11.00', ['Digestive health'], ['Indigestion', 'Nausea'], 'green'),
  medicine('Peppermint Antacid', 'Mint heartburn support', '$7.95', ['Digestive health'], ['Heartburn', 'Indigestion'], 'peach'),
  medicine('Constipation Relief Sachets', 'Fibre-based bowel support', '$12.75', ['Digestive health'], ['Constipation'], 'blue'),
  medicine('Travel Hydration Pack', 'Travel fluid replacement', '$13.95', ['Digestive health', 'Vitamins'], ['Dehydration support', 'Travel recovery'], 'green'),
  medicine('Nausea Relief Bands', 'Drug-free travel support', '$10.00', ['Digestive health'], ['Motion sickness', 'Travel nausea'], 'peach'),
  medicine('Ginger Capsules', 'Herbal nausea support', '$11.50', ['Digestive health'], ['Mild nausea', 'Digestive discomfort'], 'blue'),
  medicine('Laxative Suppositories', 'Short-term bowel relief', '$8.95', ['Digestive health'], ['Constipation'], 'green'),
  medicine('Reflux Chewables', 'Chewable acid relief', '$7.50', ['Digestive health'], ['Heartburn', 'Acid reflux'], 'peach'),
  medicine('Stomach Comfort Tea', 'Herbal digestive drink', '$6.75', ['Digestive health'], ['Digestive comfort', 'Bloating'], 'blue'),
  medicine('Dry Eye Lubricant Drops', 'Moisture for dry eyes', '$12.50', ['First aid'], ['Dry eyes', 'Eye irritation'], 'green'),
  medicine('Cold Sore Cream', 'Cold sore symptom support', '$11.25', ['First aid'], ['Cold sore discomfort'], 'peach'),
  medicine('Athlete Foot Cream', 'Antifungal foot care', '$13.00', ['First aid'], ['Athlete\'s foot', 'Itching'], 'blue'),
  medicine('Anti-Itch Cream', 'Localized itch relief', '$8.25', ['First aid'], ['Insect bites', 'Minor itching'], 'green'),
  medicine('Wart Treatment Gel', 'Local wart care', '$14.25', ['First aid'], ['Common warts'], 'peach'),
  medicine('Foot Blister Pads', 'Friction protection', '$7.25', ['First aid'], ['Blisters', 'Friction protection'], 'blue'),
  medicine('Nail Repair Solution', 'Nail care support', '$15.75', ['First aid'], ['Nail care'], 'green'),
  medicine('Scalp Care Shampoo', 'Scalp comfort wash', '$12.95', ['First aid'], ['Dry scalp', 'Scalp irritation'], 'peach'),
  medicine('Moisturising Cream', 'Dry skin moisturiser', '$9.75', ['First aid'], ['Dry skin', 'Skin barrier support'], 'blue'),
  medicine('Cleansing Wound Spray', 'No-sting wound cleanser', '$10.50', ['First aid'], ['Minor cuts', 'Grazes'], 'green'),
  medicine('Medical Tape Roll', 'Dressing support tape', '$5.25', ['First aid'], ['Dressing support', 'Minor wounds'], 'peach'),
  medicine('Reusable Hot Water Bottle', 'Heat comfort support', '$18.00', ['Pain relief', 'First aid'], ['Muscle tension', 'Period pain'], 'blue'),
  medicine('Reusable Ice Pack', 'Cold comfort support', '$12.00', ['Pain relief', 'First aid'], ['Swelling', 'Minor bumps'], 'green'),
  medicine('Wrist Support Brace', 'Light wrist support', '$16.50', ['Pain relief', 'First aid'], ['Wrist discomfort', 'Joint support'], 'peach'),
  medicine('Knee Support Sleeve', 'Light knee support', '$19.00', ['Pain relief', 'First aid'], ['Knee discomfort', 'Joint support'], 'blue'),
  medicine('Posture Support Strap', 'Back posture aid', '$21.50', ['Pain relief', 'First aid'], ['Posture support', 'Back discomfort'], 'green'),
  medicine('Massage Balm', 'Warming muscle balm', '$10.75', ['Pain relief', 'First aid'], ['Muscle aches', 'Joint discomfort'], 'peach'),
  medicine('Arnica Gel', 'Bruise comfort gel', '$12.25', ['Pain relief', 'First aid'], ['Bruising', 'Minor swelling'], 'blue'),
  medicine('Cooling Muscle Spray', 'Cooling post-activity spray', '$11.75', ['Pain relief', 'First aid'], ['Muscle aches', 'Activity discomfort'], 'green'),
  medicine('Period Heat Patch', 'Portable period comfort', '$9.25', ['Pain relief', 'First aid'], ['Period pain', 'Muscle cramps'], 'peach'),
  medicine('Migraine Cooling Mask', 'Cooling head comfort', '$15.50', ['Pain relief', 'First aid'], ['Headache comfort', 'Eye strain'], 'blue'),
];
