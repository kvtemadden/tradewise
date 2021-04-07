module.exports = {
    format_date: (date) => {
      return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${
        new Date(date).getFullYear()
      }`;
    },
    customer: (value) => {
      if (value == 1) {
        console.log("customer!");
         return true
      } 
      else { 
        return false; 
      }    
    }
  };
  