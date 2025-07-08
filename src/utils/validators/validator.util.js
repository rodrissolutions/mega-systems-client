import ecuValidators from "ecuador-validator";
import validators from "validator";

// Lista ampliada de dominios que NO se deben permitir (dominios de prueba o temporales)
const forbiddenDomains = [
  "example.com",
  "test.com",
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "dispostable.com",
  "yopmail.com",
  "fakeinbox.com",
  "trashmail.com",
  "maildrop.cc",
  "mytemp.email",
  "emailondeck.com",
  "throwawaymail.com",
  "getnada.com",
  "inboxbear.com",
  "moakt.com",
  "anonbox.net",
  "emailtemporario.com.br",
  "spambog.com",
  "mintemail.com",
  "spamgourmet.com",
  "temporaryemail.net",
  "sharklasers.com",
  "mailnesia.com",
  "inboxkitten.com",
  "pokemail.net",
  "tmail.ws",
  "boun.cr",
  "33mail.com",
];

const isValidDNI = (dni) => {
  return ecuValidators.ci(dni);
};

const isValidPhone = (phone) => {
  return ecuValidators.cellphone(phone);
};

const isValidRUC = (ruc) => {
  return ecuValidators.ruc(ruc);
};

const isValidEmail = (email) => {
  if (!validators.isEmail(email)) return false;

  const domain = email.split("@")[1]?.toLowerCase();
  return !forbiddenDomains.includes(domain);
};

export default {
  isValidDNI,
  isValidPhone,
  isValidRUC,
  isValidEmail,
};
