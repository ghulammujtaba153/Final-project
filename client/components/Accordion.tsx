import React, { useState } from 'react';

const FAQs = [
  {
    question: 'What are the hospital\'s visiting hours?',
    answer: 'Our visiting hours are from 8:00 AM to 8:00 PM. Specific wards or units like intensive care, maternity, and pediatric units may have different visiting rules, so please check with the ward staff or our website for details.',
    open: false
  },
  {
    question: 'How do I register for the hospital’s patient portal?',
    answer: 'You can register by visiting our website or the patient service desk at our hospital. You will need your patient ID or a valid form of identification to set up your account.',
    open: false
  },
  {
    question: 'How can I book, reschedule, or cancel an appointment?',
    answer: 'Appointments can be booked through our patient portal or by calling our appointment hotline. You can reschedule or cancel appointments using the same methods at least 24 hours before your scheduled time.',
    open: false
  },
  {
    question: 'What insurance plans are accepted at the hospital?',
    answer: 'We accept a wide range of health insurance plans. A complete list is available on our website or you can contact our billing department for more information.',
    open: false
  },
  {
    question: 'How can I access my medical records?',
    answer: 'Your medical records are available through our patient portal. You can also request physical copies by submitting a request form available on our website or at the hospital’s records department.',
    open: false
  },
];

const Accordion = () => {
  const [faqs, setFaqs] = useState(FAQs);

  const toggleFAQ = (index: number) => {
    const newFaqs = faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    });
    setFaqs(newFaqs);
  };

  return (
    <div className="w-[90%] max-w-xl mx-auto mt-6 mb-10" id='faqs'>
      <h2 className="text-center text-xl font-bold text-black mb-6 text-white">FAQs</h2>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`bg-gray-100 rounded-lg mb-4 shadow transition-all ${faq.open ? 'shadow-lg' : 'shadow-md'}`}
        >
          <div 
            onClick={() => toggleFAQ(index)} 
            className="flex justify-between items-center p-4 cursor-pointer text-sm text-black"
          >
            {faq.question}
            <span className={`text-2xl transition-transform duration-300 ${faq.open ? 'rotate-180' : ''}`}>
              {faq.open ? '−' : '+'}
            </span>
          </div>
          <div 
            className={`bg-white transition-all duration-500 overflow-hidden ${faq.open ? 'max-h-96 p-4' : 'max-h-0 p-0'}`}
          >
            <p className="text-black text-sm">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
