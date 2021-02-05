module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    preferredPronoun: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    postalCode: {
      type: Sequelize.NUMBER
    },
    phoneNumber: {
      type: Sequelize.NUMBER
    }
  });

  return Contact;
};
