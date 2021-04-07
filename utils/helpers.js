module.exports = {
    format_date: (date) => {
      return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${
        new Date(date).getFullYear()
      }`;
    },
    short: (text) => {
      if (text.length > 150) {
        str = text.substring(0, 147);
        str = `${str}...`;
         return str
      } 
    }
  };
  