const verifyEmailTemplate = ({ name, url }) => {
  return `
        <div> 
        <h1>Dear ${name}</h1>
        <h4>Thanks you for registering with Grocerystore.</h4>
        <p> Please verify your email by clicking on the link below.</p>
        </div>
        <div style="margin-top: 50px">
          <a href="${url}" style="background-color: blue; color: white; padding: 15px; border: 1px solid white; cursor: pointer; text-align: center; font-size: 20px; font-weight: bold">Verify Email</a>
        </div>
    `;
};

export default verifyEmailTemplate;
