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
  socials: { instagram: "", facebook: "" }
};
// TODO confirm Woodbridge opening hours and exact business name
