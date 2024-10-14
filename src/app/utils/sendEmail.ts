import { FormData } from '../../components/contact/contactForm/contactForm';

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/sendEmail';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}