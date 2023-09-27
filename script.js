const stringToHTML = (str) =>
  document.createRange().createContextualFragment(str.trim()).firstChild;

let email = "";

const home = `
<div class="newsletter-sign-up-form-container">
<div id="newsletter-sign-up-form-email-illustration"></div>

<div class="newsletter-sign-up-form">
  <h1>Stay updated!</h1>

  <p>Join 60,000+ product managers receiving monthly updates on:</p>

  <ul class="newsletter-updates-list">
    <li>Product discovery and building what matters</li>

    <li>Measuring to ensure updates are a success</li>

    <li>And much more!</li>
  </ul>

  <form id="newsletter-sign-up-form-email" data-valid="true">
    <div id="newsletter-sign-up-form-email-input-wrapper">
      <label
        id="newsletter-sign-up-form-email-input-label"
        for="newsletter-sign-up-form-email-input"
        >Email address</label
      >
      <input
        type="email"
        id="newsletter-sign-up-form-email-input"
        placeholder="email@company.com"
      />
      <div class="newsletter-sign-up-form-email-input-error-msg">
        Valid email required
      </div>
    </div>

    <button class="newsletter-sign-up-form-button" type="button">
      <span
        class="newsletter-sign-up-form-button-hover"
        aria-hidden="true"
        >Subscribe to monthly newsletter</span
      >
      <span class="newsletter-sign-up-form-button-box-shadow"></span>
      Subscribe to monthly newsletter
    </button>
  </form>
</div>
</div>
`;
const homeElement = stringToHTML(home);

function initializeHome() {
  const el = homeElement.cloneNode(true);
  document.body.appendChild(el);

  const signUpForm = document.querySelector("#newsletter-sign-up-form-email");
  const signUpFormInput = document.querySelector(
    "#newsletter-sign-up-form-email-input"
  );
  const signUpFormSubmitButton = document.querySelector(
    ".newsletter-sign-up-form-button"
  );

  signUpFormInput.addEventListener("input", disableErrorMessage);
  signUpFormSubmitButton.addEventListener("click", submitEmailAddress);

  function disableErrorMessage() {
    if (signUpFormInput.checkValidity() === false) return;
    signUpForm.dataset.valid = "true";
  }

  signUpForm.addEventListener("keypress", submitEmailWithEnter);

  function submitEmailAddress() {
    if (signUpFormInput.checkValidity()) {
      email = signUpFormInput.value;

      signUpForm.removeEventListener("keypress", submitEmailWithEnter);
      signUpFormInput.removeEventListener("change", disableErrorMessage);
      signUpFormSubmitButton.removeEventListener("click", submitEmailAddress);

      document.body.innerHTML = "";
      initializeSuccessScreen();
    } else {
      signUpForm.dataset.valid = "false";
      document.body.focus();
    }
  }

  function submitEmailWithEnter(e) {
    if (e.keyCode === 13) {
      console.log(3);
      submitEmailAddress();
      e.preventDefault();
    }
  }
}

initializeHome();

const successScreen = `
<div class="success-component-wrapper">
<div class="success-component">
<div>
  <img
    src="./assets/images/icon-success.svg"
    alt=""
    class="success-checkmark"
  />
  <h1>Thanks for subscribing!</h1>
  <p>
    A confirmation email has been sent to
    <span class="email">ash@loremcompany.com</span>. Please open it and
    click the button inside to confirm your subscription.
  </p>
</div>

<button class="newsletter-sign-up-form-button" type="button">
  <span class="newsletter-sign-up-form-button-hover" aria-hidden="true"
    >Dismiss message</span
  >
  <span class="newsletter-sign-up-form-button-box-shadow"></span>
  Dismiss message
</button>
</div>
</div>
`;
const successScreenElement = stringToHTML(successScreen);

function initializeSuccessScreen() {
  const el = successScreenElement.cloneNode(true);
  document.body.appendChild(el);

  const dismissMessageButton = document.querySelector(
    ".newsletter-sign-up-form-button"
  );
  dismissMessageButton.addEventListener("click", goBlackToHome);

  function goBlackToHome() {
    dismissMessageButton.removeEventListener("click", goBlackToHome);
    document.body.innerHTML = "";
    initializeHome();
  }
}
