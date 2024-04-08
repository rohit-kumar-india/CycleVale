import Head from 'next/head';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-3 sm:px-5">
      <Head>
        <title>About Us - CycleVale</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">About CycleVale</h1>
        <p className="text-center text-lg mb-10">Discover the journey and people behind CycleVale, your trusted online bicycle marketplace.</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Our Mission</h2>
          <p className="text-gray-700">To revolutionize the bicycle buying experience, making it easier and more accessible for cyclists of all levels to find their perfect ride. We are committed to supporting a sustainable future by promoting cycling as a healthy and eco-friendly mode of transportation.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Team Member */}
            <div className="bg-white rounded-lg shadow p-6">
              <img className="w-32 h-32 rounded-full mx-auto" src="/images/team-member-1.jpg" alt="Team Member Name" />
              <div className="text-center mt-4">
                <p className="text-xl font-semibold">Alex Johnson</p>
                <p className="text-sm text-gray-600">Founder & CEO</p>
                <p className="mt-2 text-gray-700">Driven by a passion for cycling, Alex founded CycleVale to bring the cycling community together.</p>
              </div>
            </div>
            {/* Add more team members here */}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5">Get in Touch</h2>
          <p className="text-gray-700 mb-3">Questions, feedback, or just want to say hi? We'd love to hear from you.</p>
          <p className="text-gray-700"><strong>Email:</strong> contact@cyclevale.com</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
