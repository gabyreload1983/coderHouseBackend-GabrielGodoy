export const purchaseHtml = (code) => {
  return ` 
  <div>
    <h1>Muchas gracias por tu compra.</h1>
    <p>El codigo de tu compra es: ${code}</p>
    <strong>Saludos coordiales.</strong>
  </div>`;
};

export const resetPasswordHtml = (uid) => {
  return `
  <h1>Reset password</h1>
  <p>To reset your password, go to the following <a href="http://localhost:8080/reset-password?id=${uid}">link</a></p>
  <p>This link is valid for 1 hour</p>
  `;
};

export const userInactive = (user) => {
  return `
  <h2>Hello ${user.first_name} ${user.last_name}.</h2>
  <p>Your acount was delete for inactivity</p>
  <p>If you want to register again, please go to the next link</p>
  <a href="http://localhost:8080/register">Register</a>
    `;
};

export const productDelete = (product) => {
  return `
  <h2>A product you created was deleted.</h2>
  <p>Product detail:</p>
  <ul>
    <li>ID: ${product._id}</li>
    <li>Title: ${product.title}</li>
    <li>Description: ${product.description}</li>
  </ul>`;
};
