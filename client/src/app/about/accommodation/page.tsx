"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import Image from 'next/image';

const hotels = [
  {
    name: "Hotel Grand Akther",
    address: "Modina Market, Sylhet 3100",
    phone: "01711-476589",
    images: ["/one1.jpg", "/one2.jpg"],
  },
  {
    name: "Rainbow Guest House",
    address: "Mia Fazilchisth, Road Sylhet - Sunamganj Hwy, Sylhet",
    phone: "01712-233500",
    web: "https://rainbow-guest-3100.bangladeshhotels.net/en/",
    images: ["/two1.jpeg", "/two2.jpeg"],
  },
  {
    name: "Hotel Kaykobad International",
    address: "Airport Road, Amberkhana Point, Sylhet",
    phone: "01312-875790",
    images: ["/three1.jpeg", "/three2.jpeg"],
  },
  {
    name: "Hotel Noorjahan Grand",
    address: "Waves 1, Ritz Tower, Dargah Gate, Sylhet, Bangladesh",
    phone: "+8801930 111 666",
    email: "noorjahangrand@gmail.com",
    images: ["/four1.jpeg", "/four2.jpeg"],
  },
  {
    name: "Hotel Salsabil",
    address: "Electric Supply Road, Ambar Khana, Sylhet",
    phone: "0821718579, +8801840477707",
    images: ["/five1.jpg", "/five2.jpg"],
  },
  {
    name: "Hotel Sylhet Paradise Inn",
    address: "Haque Tower, Naiorpul Point, Sylhet",
    phone: "+880 1551-552553",
    web: "https://sylhetparadiseinn.com/contact/",
    images: ["/six1.jpeg", "/six2.jpeg"],
  },
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
        <div className="grid md:grid-cols-2 gap-8">
          {hotels.map((hotel, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-700">{hotel.address}</p>
              <p className="text-gray-700">Phone: {hotel.phone}</p>
              {hotel.email && <p className="text-gray-700">Email: {hotel.email}</p>}
              {hotel.web && (
                <p className="text-blue-600 underline">
                  <a href={hotel.web} target="_blank" rel="noopener noreferrer">Website</a>
                </p>
              )}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {(hotel.images || []).map((image, i) => (
                  <Image key={i} src={image} alt={`${hotel.name} Image`} width={200} height={150} className="rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
