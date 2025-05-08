export const LOCALSTORAGEKEY = "preferredLangOptions";

export const ENGLISHLANGUAGEOPTIONS = {
  language: "en",
  textDirection: "ltr",
};

// The number of days a user must wait before sending another message using the contact form
// (see dateUtils.jsx)
export const MESSAGECOOLDOWN = 3;

// Regex for Contact Form component (see ContactForm.jsx)
export const PHONEREGEXPATTERN = "^\\+?[0-9]{7,15}$";
export const EMAILREGEXPATTERN = "^[^@]+@[^@]+.[a-zA-Z]{2,}$";