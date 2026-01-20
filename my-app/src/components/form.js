
const form = document.createElement("form");


function createInput(labelText, type, name, id) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;

  form.appendChild(label);
  form.appendChild(document.createElement("br")); 
  form.appendChild(input);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br")); 
}


createInput("Name:", "text", "userName", "user-name");
createInput("Email:", "text", "Email", "user-email");
createInput("Password:", "password", "userPassword", "user-password");
createInput("Confirm Password:", "password", "conformPassword", "conform-password");
createInput("Phone Number:", "text", "phoneNumber", "user-phonenumber");


function createButton(text, id, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  if (id) button.id = id;
  button.addEventListener("click", onClick);

  form.appendChild(button);
  form.appendChild(document.createElement("br")); 
  form.appendChild(document.createElement("br")); 
}


createButton("Login", null, () => alert("Login clicked!"));
createButton("Sign-In", "sign-in", () => alert("Sign-In clicked!"));
createButton("Sign-Up", "sign-up", () => {
  const password = document.getElementById("user-password").value;
  const confirmPassword = document.getElementById("conform-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    alert("Sign-Up successful!");
  }
});


document.body.appendChild(form);