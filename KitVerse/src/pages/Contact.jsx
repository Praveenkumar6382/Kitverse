import React from "react";


const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Contact Image */}
        <div className="md:w-1/2 flex justify-center">
          <img className='w-70 md:w-70 rounded-lg shadow-lg' src='https://televerde.com/wp-content/uploads/2022/01/X-important-factors-to-consider-in-your-customer-care-strategy.jpg' alt=""/>
        </div>

        {/* Contact Information */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question about
            our football jerseys, your order, or anything else, our team
            is ready to help.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">
                KitVerse<br />
                Thiruvanmiyur, Chennai<br />
                Tamil Nadu, India
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg"> Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">support@kitverse.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg"> Business Hours</h3>
              <p className="text-gray-600">
                Monday – Saturday<br />
                9:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          <button className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;