import { SignInButton } from "@clerk/nextjs";
import { FaHospital,FaVideo,FaFilePrescription,FaMicroscope ,FaUtensils ,FaPills  } from "react-icons/fa";

export default function Homepage() {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-white font-sans">
      {/* Header */}
      <header className="container mx-auto px-3 py-3 flex justify-between items-center">
        <div className="text-3xl font-bold text-teal-700 tracking-wide">HealCare</div>
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
              <li className="text-teal-900 hover:text-teal-600 transition-colors">
                Donate Button
              </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="bg-gradient-to-br from-teal-50 to-teal-100">
          <div className="h-screen flex flex-col md:flex-row items-center justify-center">
            <div className="text-center">
              <h1 className="text-7xl font-extrabold text-teal-800 leading-tight">
                Your Health, <br className="hidden md:inline" />
                <span className="text-teal-600 mt-5">Our Priority</span>
              </h1>
              <div className="mt-10">
                <SignInButton>
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105">
                    Get Started with HealCare
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
<section id="features" className="py-10">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-teal-800 mb-12">Why Choose HealCare?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Video Consultations",
          description: "Connect with experienced doctors through secure video calls anytime.",
          icon: <FaVideo className="text-4xl text-teal-600" />
        },
        {
          title: "Prescriptions",
          description: "Get online prescriptions instantly after your consultation.",
          icon: <FaFilePrescription className="text-4xl text-teal-600" />
        },
        {
          title: "AI Disease Analyzer",
          description: "Enter symptoms and let AI suggest possible conditions instantly.",
          icon: <FaMicroscope className="text-4xl text-teal-600" />
        },
        {
          title: "AI Recipe Recommender",
          description: "Get AI-curated healthy recipes based on your health needs.",
          icon: <FaUtensils className="text-4xl text-teal-600" />
        },
        {
          title: "AI Food & Medicine Prescriptor",
          description: "Receive AI-powered recommendations for the right food and medicines.",
          icon: <FaPills className="text-4xl text-teal-600" />
        },
        {
          title: "Nearest Hospital Finder",
          description: "Locate the best healthcare facilities near you with ease.",
          icon: <FaHospital className="text-4xl text-teal-600" />
        },
        {
          title: "Workout",
          description: "AI based workout manager for users.",
          icon: <FaFilePrescription className="text-4xl text-teal-600" />
        },
      ].map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 flex flex-col items-center">
          {feature.icon}
          <h3 className="text-xl font-semibold text-teal-700 mt-4">{feature.title}</h3>
          <p className="text-teal-600 text-center mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* Call to Action Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-teal-600 to-teal-700 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
            <p className="text-lg mb-8">Join thousands of satisfied users and start your journey to better health today.</p>
            <SignInButton>
              <button className="bg-white text-teal-600 px-8 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-teal-50 transition transform hover:scale-105">
                Sign Up Now
              </button>
            </SignInButton>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">HealCare</div>
          <nav>
            <ul className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-teal-300 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
