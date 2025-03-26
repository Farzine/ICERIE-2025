"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Carousel from '@/js';
import { MapPin } from "lucide-react";
const hotels = [
  {
    name: "Hotel Grand Akther",
    address: "Modina Market, Sylhet 3100",
    phone: "01711-476589",
    web: "https://www.facebook.com/hotelgrandakther/",
    location: "https://www.google.com/maps/place/Hotel+Grand+Akther/@24.9100676,91.8473473,17z/data=!3m1!4b1!4m6!3m5!1s0x3750556ac607414b:0x11af9a1ca2d84345!8m2!3d24.9100628!4d91.8499222!16s%2Fg%2F11j_5zlj9y?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/one1.jpg", "/one2.jpg"],
  },
  {
    name: "Rainbow Guest House",
    address: "Mia Fazilchisth, Road Sylhet - Sunamganj Hwy, Sylhet",
    phone: "01712-233500",
    web: "https://rainbow-guest-3100.bangladeshhotels.net/en/",
    location: "https://www.google.com/maps/place/Rainbow+Guest+House/@24.9062174,91.8615032,17z/data=!3m1!4b1!4m9!3m8!1s0x37505525a324a3db:0x400ee8b5b5933fd8!5m2!4m1!1i2!8m2!3d24.9062126!4d91.8640781!16s%2Fg%2F11rxn391h?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/two1.jpeg", "/two2.jpeg"],
  },
  {
    name: "Hotel Kaykobad International",
    address: "Airport Road, Amberkhana Point, Sylhet",
    phone: "01312-875790",
    web: "https://www.facebook.com/p/Hotel-kaykobad-international-ambarkana-point-sylhet-100078158122477/",
    location: "https://www.google.com/maps/place/Hotel+Kaykobad+(Residential)/@24.9048729,91.8648257,17z/data=!3m1!4b1!4m6!3m5!1s0x375055280abc5f65:0xdada4b6ca2f77e11!8m2!3d24.9048681!4d91.8696966!16s%2Fg%2F11dfgwml2d?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/three1.jpeg", "/three2.jpeg"],
  },
  {
    name: "Hotel Noorjahan Grand",
    address: "Waves 1, Ritz Tower, Dargah Gate, Sylhet, Bangladesh",
    phone: "+8801930 111 666",
    email: "noorjahangrand@gmail.com",
    web: "https://www.noorjahangrand.com/",
    location: "https://www.google.com/maps/place/Hotel+Noorjahan+Grand/@24.9019844,91.8671219,17z/data=!4m10!3m9!1s0x37505528367b7ac5:0xd3af9a6aee2fd11e!5m3!1s2025-03-27!4m1!1i2!8m2!3d24.9019796!4d91.8696968!16s%2Fg%2F11byxf17q1?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/four1.jpeg", "/four2.jpeg"],
  },
  {
    name: "Hotel Salsabil",
    address: "Electric Supply Road, Ambar Khana, Sylhet",
    phone: "0821718579, +8801840477707",
    web:"https://www.facebook.com/salsabil.restaurent/",
    location:"https://www.google.com/maps/place/Hotel+Salsabil/@24.9052528,91.8690486,17z/data=!3m1!4b1!4m10!3m9!1s0x375054d810ecbaaf:0x1005e5e531a3565e!5m3!1s2025-03-27!4m1!1i2!8m2!3d24.905248!4d91.8716235!16s%2Fg%2F11f2wd100d?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/five1.jpg", "/five2.jpg"],
  },
  {
    name: "Hotel Sylhet Paradise Inn",
    address: "Haque Tower, Naiorpul Point, Sylhet",
    phone: "+880 1551-552553",
    web: "https://sylhetparadiseinn.com/contact/",
    location:"https://www.google.com/maps/place/Sylhet+Paradise+Inn/@24.8931442,91.87358,17z/data=!4m10!3m9!1s0x37505500625b14c9:0xaf73d462a152f2f4!5m3!1s2025-03-27!4m1!1i2!8m2!3d24.8931394!4d91.8784509!16s%2Fg%2F11y5mxxmsl?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    images: ["/six1.jpeg", "/six2.jpeg"],
  }
];

export default function Accommodation() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero section with red accent */}
      <div className="flex-grow w-full bg-white mx-auto flex flex-col items-center p-4 md:p-10 mt-28">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Accommodation</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Premier Hotel Options for ICERIE 2025 Conference Attendees
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Best Hotels in Sylhet</h2>
          <p className="text-2xl text-gray-700">
            Mention <span className="font-semibold text-red-500">ICERIE 2025</span> when booking to receive special conference discounts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Image carousel */}
              <div className="relative h-52 overflow-hidden">
                <div className="grid grid-cols-2 h-full">
                  {hotel.images.map((image, idx) => (
                    <div key={idx} className="relative w-full h-full">
                      <img
                      src={image}
                      alt={`${hotel.name} - Image ${idx + 1}`}
                      className={`w-full h-full object-cover ${idx === 1 ? "border-l border-white" : ""}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Hotel info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-3">{hotel.address}</p>
                
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {hotel.phone}
                  </p>
                  
                  {hotel.email && (
                    <p className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {hotel.email}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  {hotel.web && (
                    <a
                      href={hotel.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </a>
                  )}
                  {hotel.location && (
                    <a
                      href={hotel.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-300"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Map
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
