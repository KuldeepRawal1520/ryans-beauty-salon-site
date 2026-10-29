# Ryan's Beauty Salon Website

Static website deployed on Vercel for Ryan's Beauty Salon in Etobicoke, Ontario.

## Files
- `index.html`: Single-page website markup and local business metadata.
- `styles.css`: Responsive dark-charcoal and red theme.
- `app.js`: Navigation, service filters, review expansion, gallery lightbox, booking links, and hours status.
- `config.js`: Salon phone, booking URL, address, map directions, and business hours.
- `reviews.js`: Customer review display data.
- `images/`: Reserved for locally managed salon images.

## Local preview
Open `index.html` in a browser. This is a static site and does not require a build step.

## Deployment
The site is intended to deploy from the `main` branch on Vercel. Booking currently uses a telephone link because no online booking URL is configured.

## Images
The `images/` directory contains the salon's photo assets. `hero-red.jpg` is used as the full-bleed hero image, `storefront.jpg` appears in the location section, and the remaining 13 images are displayed in the filterable Colour, Cuts, and Brows gallery. The ash-blonde balayage photo is cropped square from the top to avoid showing its bottom text overlay. Image elements retain gradient fallbacks for failed loads.