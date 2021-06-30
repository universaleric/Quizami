const router = require('express').Router();
const  User  = require('../models/User');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  get_username: async (user_id) => {  
    // convert user_id to username
    try {
        const userData = await User.findByPk(user_id, { 
      });
      const user = await userData.get({ plain: true });
      console.log(user)
      return await user.user_name
    } catch (err) {
        return err
    }
    
  }
};
