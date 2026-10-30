window.SALON_CONFIG = {
  name: "Ryan's Beauty Salon",
  phone: "(416) 741-1721",
  bookingUrl: "",
  address: "1530 Albion Rd, Etobicoke, ON M9V 1B4",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=1530+Albion+Rd+Etobicoke+ON+M9V+1B4",
  timezone: "America/Toronto",
  hours: [
    { days: "Monday - Friday", open: "09:00", close: "20:00", label: "9:00 AM - 8:00 PM", dayIndexes: [1,2,3,4,5] },
    { days: "Saturday", open: "09:00", close: "18:00", label: "9:00 AM - 6:00 PM", dayIndexes: [6] },
    { days: "Sunday", open: "11:00", close: "17:00", label: "11:00 AM - 5:00 PM", dayIndexes: [0] }
  ],
  locations: [
    { id: "albion", label: "Albion Road", address: "1530 Albion Rd, Etobicoke, ON M9V 1B4", phone: "(416) 741-1721", tel: "+14167411721", hours: [{ days: "Monday - Friday", label: "9:00 AM - 8:00 PM" }, { days: "Saturday", label: "9:00 AM - 6:00 PM" }, { days: "Sunday", label: "11:00 AM - 5:00 PM" }], directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=1530+Albion+Rd+Etobicoke+ON+M9V+1B4" },
    { id: "woodbridge", label: "Woodbridge", address: "7777 Weston Rd Unit 131, Woodbridge, ON L4L 1A6", phone: "(905) 265-1721", tel: "+19052651721", hours: [{ days: "Tuesday - Friday", label: "10:00 AM - 7:00 PM" }, { days: "Saturday", label: "10:00 AM - 6:00 PM" }, { days: "Sunday and Monday", label: "Closed" }], directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7777+Weston+Rd+Unit+131+Woodbridge+ON+L4L+1A6" }
  ],
  barbers: [
    { name: "Ewan Koria", firstName: "Ewan", instagram: "https://instagram.com/Ewankoria", photo: "/barber-ewan-koria.png", width: 1278, height: 1230, objectPosition: "50% 8%", tel: "+19052651721" },
    { name: "Odisho Hawil", firstName: "Odisho", instagram: "https://instagram.com/odeclipz", photo: "/barber-odisho-hawil.jpg", width: 900, height: 1125, objectPosition: "50% 28%", tel: "+19052651721" },
    { name: "Marvin Toma", firstName: "Marvin", instagram: "https://instagram.com/__marvintoma", photo: "/barber-marvin-toma.jpg", width: 900, height: 1125, objectPosition: "50% 28%", tel: "+19052651721" },
    { name: "Issa Algresh", firstName: "Issa", instagram: "https://instagram.com/Issa.algresh", photo: "/barber-issa-algresh.jpg", width: 900, height: 1125, objectPosition: "50% 22%", tel: "+19052651721" }
  ],
  gallery: [
    { file: "/images/barber-work-02-curly-taper-fade.jpg", width: 640, height: 641, objectPosition: "45% 30%", alt: "Curly taper fade" },
    { file: "/images/barber-work-05-bw-skin-fade-profile.jpg", width: 640, height: 853, objectPosition: "55% 35%", alt: "Black and white skin fade profile" },
    { file: "/images/barber-work-06-pompadour-hard-part-fade.jpg", width: 640, height: 640, objectPosition: "40% 40%", alt: "Pompadour hard part fade" },
    { file: "/images/barber-work-01-skin-fade-beard-side.jpg", width: 640, height: 666, objectPosition: "40% 30%", alt: "Skin fade with beard" },
    { file: "/images/barber-work-04-pompadour-fade-beard.jpg", width: 640, height: 641, objectPosition: "55% 30%", alt: "Pompadour fade with beard" },
    { file: "/images/barber-work-08-curly-top-fade-beard.jpg", width: 640, height: 641, objectPosition: "60% 35%", alt: "Curly top fade with beard" },
    { file: "/images/barber-work-03-high-skin-fade-beard.jpg", width: 640, height: 640, objectPosition: "40% 35%", alt: "High skin fade with beard" },
    { file: "/images/barber-work-11-textured-crop-fade.jpg", width: 640, height: 640, objectPosition: "45% 40%", alt: "Textured crop fade" },
    { file: "/images/barber-work-09-skin-fade-beard-chain.jpg", width: 640, height: 640, objectPosition: "35% 40%", alt: "Skin fade with beard" },
    { file: "/images/barber-work-07-top-bun-fade-design.jpg", width: 640, height: 641, objectPosition: "45% 55%", alt: "Top bun fade design" },
    { file: "/images/barber-work-10-top-bun-fade-part.jpg", width: 640, height: 641, objectPosition: "40% 55%", alt: "Top bun fade with part" }
  ],
  socials: { instagram: "", facebook: "" }
};
// TODO confirm Woodbridge opening hours and exact business name
