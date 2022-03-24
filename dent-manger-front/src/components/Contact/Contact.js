import React, { useState } from "react";
import emailjs from "emailjs-com";

const Result = () => {
  return <p>Your message has been successfully sent!</p>;
};

function Contact(props) {
  const [result, showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_54swsig",
        "template_2jikzxe",
        e.target,
        "user_5eHahK3Q2WejLOiCOr2CP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);
  };

  return (
    <form class="contact" action="" onSubmit={sendEmail}>
      <div class="formWord">
        <h2>Send e-mail to Your patient</h2>
        <span>Receiver name: </span>
        <br />
        <input class="input100" type="text" name="from_name" required />
        <br />
        <span>E-mail: </span>
        <br />
        <input class="input100" type="text" name="reply_to" required />
        <br />
      </div>
      <div class="formWord">
        <span>Message: </span>
        <br />
        <textarea name="message" required></textarea>
        <br />
        <button>SUBMIT</button>

        <div class="rowText">{result ? <Result /> : null}</div>
      </div>
    </form>
  );
}
export default Contact;
