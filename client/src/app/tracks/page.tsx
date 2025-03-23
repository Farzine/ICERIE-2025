"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Carousel from "@/js";

export default function IndustryTracks() {
  const sections = [
    {
      id: 'architecture',
      title: 'Architecture, Civil and Environmental Engineering',
      description: [
        'Architecture',
        'Urban design and planning',
        'Biodiversity, climate change and disaster management',
        'Environment',
        'Geotechnology and earthquake',
        'Structural Engineering and Construction Management',
        'Traffic and transportation engineering',
        'Water resources',
        'Water and waste water treatment, waste management',
      ],
    },
    {
      id: 'chemical',
      title: 'Chemical, Petroleum and Food Process Engineering',
      description: [
        'Chemical process technology',
        'Food and beverage technology',
        'Mining technology',
        'Petroleum technology and reservoir engineering',
        'Polymer technology',
        'Separation technology',
        'Tea science and technology',
        'Renewable energy',
        'Nanoscience and Nanotechnology',
      ],
    },
    {
      id: 'electrical',
      title: 'Electrical, Information and Communication Engineering',
      description: [
        'Artificial intelligence',
        'Big-data analysis',
        'Bio-informatics and nanotechnology',
        'Information and communication',
        'Natural language processing',
        'Power system and machineries',
        'Robotics, mechatronics and neural network',
        'Power generation and distribution',
      ],
    },
    {
      id: 'mechanical',
      title: 'Mechanical, Industrial and Sustainable Engineering',
      description: [
        'Advanced manufacturing processes',
        'Aerospace engineering',
        'Computational mechanics and simulation',
        'Energy',
        'Ergonomics',
        'Firm power and machinery',
        'Industrial engineering and management',
        'Material science and metallurgy',
        'Operation research and management',
        'Production process and quality control',
        'Supply chain and logistics management',
        'Thermal engineering, heat transfer and fluid mechanics',
        'Refrigeration and air conditioning',
        'Automobile engineering',
      ],
    },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
     
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row mt-24">
        <aside className="bg-white px-20 w-full md:w-1/4 md:ml-16 mt-8">
          <div className="flex justify-center items-center mt-2 md:pt-5 ">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 md:mb-6">Tracks</h2>
            </div>
            <div className="ml-0 md:ml-7 mt-4 md:mt-0">
              <svg
                version="1.1"
                viewBox="0 0 2048 1762"
                width="40"  // Adjusted for smaller screens
                height="40" // Adjusted for smaller screens
                className="md:w-50 md:h-50 mb-4" // Responsive size
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  transform="translate(1016,500)"
                  d="m0 0h365l20 3 21 7 15 9 14 12 11 13 14 22 17 26 28 44 16 26 24 38 15 24 11 16h141l31 1 19 3 16 8 9 7 8 11 4 10 1 12-2 15-6 16-9 13-9 8-16 8-13 3-22 1h-197l-20-2-13-5-11-7-12-12-12-17-15-22-12-18-11-17-14-22-8-12-9-12-6-6h-8l-6 5-12 19-13 23-14 24-10 17-17 29-10 17-13 22-15 25-13 22-12 20v5l13 10 15 10 66 45 27 18 23 16 12 8 16 11 18 13 10 8 11 11 7 11 6 13 4 13 2 15v13l-2 16-6 17-9 16-11 13-12 9-16 9-19 8-30 10-45 14-47 15-42 13-41 13-78 24-16 2-12-2-12-5-8-6-8-8-8-16-2-7v-15l3-12 6-12 9-10 14-8 41-19 28-12 22-10 25-11 24-11 28-13 28-12 5-4v-2l-17-10-16-9-44-24-28-15-16-9-29-16-21-12-16-9-24-14-17-10-11-9-12-11-11-12-10-15-8-16-6-16-5-22-2-15v-21l3-18 6-20 7-16 8-15 15-25 11-18 12-20 13-22 15-25 13-22 15-25 6-13v-6l-6-7-8-1h-106l-5 4-15 20-10 13-12 16-13 18-20 26-14 19-13 17-10 14-10 13-13 17-10 13-10 10-16 9-9 3-17 2-12-2-14-7-10-9-6-10-3-8-1-15 3-15 7-14 12-17 14-19 12-16 42-57 13-17 14-19 10-13 11-15 13-17 10-13 13-15 10-9 14-9 15-6 12-3 7-1z"
                  fill="#251919"
                />
                <path
                  transform="translate(964,950)"
                  d="m0 0 5 1 5 8 10 19 11 17 9 12 9 10 11 11 16 12 15 9 18 11 4 4-2 6-7 11-8 10-13 17-22 28-10 13-9 12-10 12-16 20-9 11-14 18-20 26-11 14-21 27-9 12-11 14-13 17-11 14-13 16-9 12-10 13-14 18-12 15-13 17-12 15-10 13-12 16-13 16-9 12-12 15-9 11-8 8-7 5-9 4-10 2h-13l-13-3-12-7-9-9-7-12-4-15v-9l4-16 5-10 15-24 16-25 11-17 13-21 16-25 11-17 14-23 7-10 13-21 14-22 15-23 8-13 20-32 10-15 15-24 12-19 28-44 12-19 13-20 14-22 10-15 11-18 14-23 11-17 7-11z"
                  fill="#251919"
                />
                <path
                  transform="translate(1427,207)"
                  d="m0 0h28l17 3 16 5 17 9 14 10 13 12 9 10 10 15 8 17 5 18 2 15v23l-3 19-6 18-9 17-10 13-10 11-14 11-10 7-17 8-23 6-17 2h-11l-18-2-19-5-15-6-16-10-14-12-10-11-12-17-8-17-5-17-2-13v-28l3-17 6-18 9-17 11-15 11-12 11-9 16-10 15-7 15-4z"
                  fill="#251919"
                />
                <path
                  transform="translate(483,1061)"
                  d="m0 0h129l87 1 10 3 8 5 7 8 4 9 1 4v11l-3 10-6 8-5 5-6 4-12 3h-319l-9-2-8-4-8-7-7-14v-15l4-11 6-8 8-6 8-3z"
                  fill="#251919"
                />
                <path
                  transform="translate(262,1211)"
                  d="m0 0h317l11 2 10 5 7 7 5 9 2 7v11l-3 9-6 9-8 7-9 3-5 1h-324l-11-4-8-7-6-8-2-5v-20l4-10 5-6 9-6 7-3z"
                  fill="#251919"
                />
                <path
                  transform="translate(493,924)"
                  d="m0 0h160l161 1 8 2 10 5 7 9 4 10 1 8-2 12-5 9-5 6-8 5-12 3h-321l-13-4-9-7-7-11-2-8 1-13 4-10 9-10 12-6z"
                  fill="#251919"
                />
              </svg>
            </div>
          </div>

          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="block border-2 w-full text-left mt-7 p-2 mb-2 bg-gradient-to-br from-red-50 to-white hover:bg-gray-100 px-5"
            >
              {section.title}
            </button>
          ))}
        </aside>
        <main className="flex-1 p-4 bg-white mb-20 md:ml-8 px-10">
          {sections.map(section => (
            <section key={section.id} id={section.id} className="mb-8 mt-14 px-5">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-500">{section.title}</h3>
              <ul className="list-disc list-outside">
                {section.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </div>
          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
