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
    { id: "woodbridge", label: "Woodbridge", address: "7777 Weston Rd Unit 131, Woodbridge, ON L4L 1A6", phone: "(905) 265-1721", tel: "+19052651721", hours: null, directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7777+Weston+Rd+Unit+131+Woodbridge+ON+L4L+1A6" }
  ],
  socials: { instagram: "", facebook: "" }
};
// TODO confirm Woodbridge opening hours and exact business name
