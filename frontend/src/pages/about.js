import Head from 'next/head';
import Team from './Team';

const AboutUs = () => {
  return (
    <div className="w-full max-w-7xl py-10 px-5 md:px-10 mx-auto">
    <div className="text-center my-[20px] md:my-[40px]">
      <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
      About Us
      </div>
      <div className="text-md md:text-xl">
      Welcome to CycleVale, where cycling meets convenience and quality. We are passionate about providing cycling enthusiasts with a seamless online experience to explore and purchase top-tier bicycles and accessories. Our mission is to make this experience accessible to everyone by curating a diverse range of bikes, from road to mountain, electric to commuter, and everything in between. We prioritize customer satisfaction by offering not just products, but also expert guidance and support, ensuring that each rider finds the perfect fit for their cycling journey. Whether you're a seasoned rider or just starting out, join us in discovering the joy of cycling with CycleVale.
     
      </div>
    </div>
    <div className="mt-[60px] min-h-screen bg-gray-50 py-10 px-3 sm:px-5">
      <Head>
        <title>About Us - CycleVale</title>
      </Head>
      <div className="max-w-4xl mx-auto">

    

      

        <section className="mb-10">
        <div className=" text-center text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
      Our Team
      </div>
          {/* <h2 className="text-2xl font-semibold mb-5">Our Team</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
            {/* Example Team Member */}
            {/* <div className="bg-white rounded-lg shadow p-6">
              <img className="w-32 h-32 rounded-full mx-auto" src="/images/team-member-1.jpg" alt="Team Member Name" />
              <div className="text-center mt-4">
                <p className="text-xl font-semibold">Alex Johnson</p>
                <p className="text-sm text-gray-600">Founder & CEO</p>
                <p className="mt-2 text-gray-700">Driven by a passion for cycling, Alex founded CycleVale to bring the cycling community together.</p>
              </div>
            </div> */}
            <Team name= "Rohit Kumar" role="Founder & CEO" image="/images/Rohit.jpeg" />
            <Team name= "Tanveer Alam" role="Founder & CEO" image="/images/Photo.jpg"/>
            <Team name= "Shreyansh Singh Chandel" role="Founder & CEO" image="/images/Shreya.jpeg"/>
            <Team name= "Neelanshi Jaiswal" role="Founder & CEO" image="/images/Neelanshi.jpeg" />
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
    </div>
  );
};

export default AboutUs;



// 11 <h1 className="text-3xl font-bold text-center mb-4">About CycleVale</h1>
// <p className="text-center text-lg mb-10">Discover the journey and people behind CycleVale, your trusted online bicycle marketplace.</p>
