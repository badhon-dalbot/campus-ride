import aboutUsHero from "../assets/images/aboutus_hero.png";
import aboutUsShareRide from "../assets/images/aboutus_shareRide.png";
import CampusRideFooter from "../components/CampusRideFooter.jsx";
import CampusRideHeader from "../components/CampusRideHeader.jsx";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              About us
            </h1>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={aboutUsHero}
                alt="ComputeRide team illustration showing two people standing next to a car with buildings in background"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              We reimagine the way the world moves for the better
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Movement is what we are. It's our lifeblood. It runs through our
              veins. It's what gets us out of bed each morning. It pushes us to
              constantly reimagine how we can move better. For all the times you
              want to go from here to there. All the times you want to earn.
              Across the entire world. In real time. At the incredible speed of
              now.
            </p>
          </div>
        </div>
      </section>

      {/* Share Your Ride Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <div className="w-full h-auto bg-blue-50 rounded-lg flex items-center justify-center">
                  <img
                    src={aboutUsShareRide}
                    alt="Share your ride illustration"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Share your Ride
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connecting millions of riders, drivers, and couriers. At
                  anytime, anywhere, with just a few taps. Our technology and
                  make transportation more accessible. We share your ride, and
                  everyone wins from sharing together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Your safety drives us
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're in the back seat or behind the wheel, your
                  safety is essential. We are committed to doing our part, and
                  technology is at the heart of our approach. We partner with
                  safety advocates and develop new technologies and policies to
                  help improve safety and help make it easier for everyone to
                  get around.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-24 h-24 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CampusRideFooter />
    </div>
  );
};

export default AboutUs;
