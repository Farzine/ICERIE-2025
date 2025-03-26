"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Image from "next/image";

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
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Best Hotels in Sylhet</h2>
        <p className="text-center text-lg mb-8">
          Please give conference ICERIE 2025 as a reference during hotel booking to get a discount.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-semibold mb-2 text-center">{hotel.name}</h3>
              <p className="text-gray-700 text-center">{hotel.address}</p>
              <p className="text-gray-700 text-center">Phone: {hotel.phone}</p>
              {hotel.email && <p className="text-gray-700 text-center">Email: {hotel.email}</p>}

              {/* Display the images */}
              <div className="grid grid-cols-2 gap-4 my-4">
                {hotel.images.map((image, idx) => (
                  <div key={idx} className="relative w-full h-40">
                    <Image
                      src={image}
                      alt={`${hotel.name} - Image ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4 my-2">
                {hotel.web && (
                  <a
                    href={hotel.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Visit Website
                  </a>
                )}
                {hotel.location && (
                  <a
                    href={hotel.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View on Map
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
