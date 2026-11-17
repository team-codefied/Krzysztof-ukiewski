export type ContactInput = { name: string; email: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 120, email: 254, subject: 160, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the browser form and the API route so both enforce identical rules. */
export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): {
  values: ContactInput;
  errors: ContactErrors;
} {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const values: ContactInput = {
    name: s(input.name),
    email: s(input.email),
    subject: s(input.subject),
    message: s(input.message),
  };
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Please enter your full name.";
  else if (values.name.length < 2) errors.name = "Your name looks too short.";
  else if (values.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email) || values.email.length > LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (!values.subject) errors.subject = "Please add a subject.";
  else if (values.subject.length > LIMITS.subject) errors.subject = `Please keep the subject under ${LIMITS.subject} characters.`;

  if (!values.message) errors.message = "Please write a message.";
  else if (values.message.length < 10) errors.message = "Your message is a little short — please add more detail.";
  else if (values.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { values, errors };
}
