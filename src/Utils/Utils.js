export const extractRoleFromEmail = (email) => {
    const parts = email.split('@')[0].split('.');
    console.log("Extracted role from email:", parts[1]);  // Log the role from email
    if (parts.length < 2) {
      console.error("Invalid email format. Expected 'name.role@domain.com'.");
      return '';
    }
    return parts[1];  // Extract and return the role
  };
  