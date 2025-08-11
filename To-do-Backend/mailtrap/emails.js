const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplate");
const { client, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Verification email sent successfully:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(
      `Failed to send verification email to ${email}: ${error.message}`
    );
  }
};

const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "d4e8c63a-1b05-476b-bffe-504c4c962a29",
      template_variables: {
        company_info_name: "To-Do List",
        name: username,
      },
    });
    console.log("Welcome Email Sent Successfully", response);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't Send Email, Something Went Wrong",
      error: error,
    });
  }
};
module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
};
