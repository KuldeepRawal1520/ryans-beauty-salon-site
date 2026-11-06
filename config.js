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
    { id: "albion", label: "Albion Road", address: "1530 Albion Rd, Etobicoke, ON M9V 1B4", phone: "(416) 741-1721", tel: "+14167411721", weekly: [{day:0,open:"11:00",close:"17:00"},{day:1,open:"09:00",close:"20:00"},{day:2,open:"09:00",close:"20:00"},{day:3,open:"09:00",close:"20:00"},{day:4,open:"09:00",close:"20:00"},{day:5,open:"09:00",close:"20:00"},{day:6,open:"09:00",close:"18:00"}], hours: [{ days: "Monday - Friday", label: "9:00 AM - 8:00 PM" }, { days: "Saturday", label: "9:00 AM - 6:00 PM" }, { days: "Sunday", label: "11:00 AM - 5:00 PM" }], directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=1530+Albion+Rd+Etobicoke+ON+M9V+1B4" },
    { id: "woodbridge", label: "Woodbridge", address: "7777 Weston Rd Unit 131, Woodbridge, ON L4L 1A6", phone: "(905) 265-1721", tel: "+19052651721", weekly: [{day:0,closed:true},{day:1,closed:true},{day:2,open:"10:00",close:"19:00"},{day:3,open:"10:00",close:"19:00"},{day:4,open:"10:00",close:"19:00"},{day:5,open:"10:00",close:"19:00"},{day:6,open:"10:00",close:"18:00"}], hours: [{ days: "Tuesday - Friday", label: "10:00 AM - 7:00 PM" }, { days: "Saturday", label: "10:00 AM - 6:00 PM" }, { days: "Sunday and Monday", label: "Closed" }], directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7777+Weston+Rd+Unit+131+Woodbridge+ON+L4L+1A6" }
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
  albionCuts: [
    { file: "/images/mens-fade.jpg", width: 1200, height: 1600, objectPosition: "50% 35%", alt: "Men's fade haircut" },
    { file: "/images/albion-cut-01-low-taper-pompadour-stubble.jpg", width: 1200, height: 1600, objectPosition: "45% 35%", alt: "Low taper pompadour haircut" },
    { file: "/images/albion-cut-02-textured-crop-high-fade-beard.jpg", width: 1200, height: 1600, objectPosition: "40% 40%", alt: "Textured crop high fade haircut" },
    { file: "/images/albion-cut-03-slick-back-low-fade.jpg", width: 1200, height: 1600, objectPosition: "60% 45%", alt: "Slick back low fade haircut" },
    { file: "/images/albion-cut-04-low-taper-slick-back-beard.jpg", width: 1200, height: 1600, objectPosition: "60% 40%", alt: "Low taper slick back haircut" },
    { file: "/images/albion-cut-05-textured-fringe-taper-line-design.jpg", width: 1200, height: 1600, objectPosition: "35% 40%", alt: "Textured fringe taper haircut" },
    { file: "/images/albion-cut-06-side-part-hard-part-fade-beard.jpg", width: 1200, height: 1600, objectPosition: "45% 45%", alt: "Side part hard part fade haircut" },
    { file: "/images/albion-cut-07-textured-crop-skin-fade.jpg", width: 1200, height: 1600, objectPosition: "45% 35%", alt: "Textured crop skin fade haircut" },
    { file: "/images/albion-cut-08-taper-fade-mullet-beard.jpg", width: 1200, height: 1600, objectPosition: "60% 40%", alt: "Taper fade mullet haircut" },
    { file: "/images/albion-cut-09-curly-top-fade-beard.jpg", width: 1200, height: 1600, objectPosition: "65% 45%", alt: "Curly top fade haircut" }
  ],
  products: [{"name":"Mon Platin Original Jojoba Wax","size":"","photo":"/images/product-mon-platin-original-jojoba-wax.jpg","width":1200,"height":1600,"objectPosition":"50% 42%","price":"$35"},{"name":"Mon Platin Jojoba Crystal Wax","size":"","photo":"/images/product-mon-platin-jojoba-crystal-wax.jpg","width":1200,"height":1600,"objectPosition":"50% 42%","price":"$35"},{"name":"Refined Hold QP Gel (32 oz)","size":"32 oz","photo":"/images/product-refined-hold-qp-gel-32oz.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$30"},{"name":"Refined Hold QP Gel (8 oz)","size":"8 oz","photo":"/images/product-refined-hold-qp-gel-8oz.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$12"},{"name":"Luseta Tea Tree & Mint Shampoo (500 ml)","size":"500 ml","photo":"/images/product-luseta-tea-tree-mint-shampoo.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$25"},{"name":"Luseta Keratin Shampoo (500 ml)","size":"500 ml","photo":"/images/product-luseta-keratin-shampoo.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$25"},{"name":"Luseta Biotin & Collagen Conditioner (1 L)","size":"1 L","photo":"/images/product-luseta-biotin-collagen-conditioner.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$30"},{"name":"Cynos Moisture Deep Recovery Hair Mask (500 ml)","size":"500 ml","photo":"/images/product-cynos-moisture-deep-recovery-hair-mask.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","price":"$25"},{"name":"Cynos Nano Color Shampoo","size":"1000 ml","photo":"/images/product-cynos-nano-color-shampoo-1000ml.jpg","width":1200,"height":1600,"objectPosition":"50% 55%","alt":"Cynos Nano Color Shampoo bottle","price":"$25"}],
  "services":{"independent":{"name":"Yela","photo":"/images/independent-yela-albion.webp","width":1200,"height":1147,"label":"Independent","location":"At our Albion Road location","text":"Yela works independently at our Albion Road location and sees her own clients. She offers women's services.","secondaryText":"Her services and pricing are separate from the salon menu.","tel":"+14167411721"}},
  socials: { instagram: "", facebook: "" }
};
// TODO confirm Woodbridge opening hours and exact business name
