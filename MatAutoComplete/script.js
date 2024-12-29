import data from './values.js';

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject("Could not fetch the data");
      }
    }, 0);
  });
}

fetchData()
  .then((response) => {
    console.log("response", response);

    const input = document.getElementById("autocomplete");
    const suggestions = document.getElementById("suggestions"); 
         let debounceTimer;
         const debounce=(func,delay)=>{
           return(...args)=>{
            clearTimeout(debounceTimer);
            debounceTimer=setTimeout(()=>{func.apply(this,args)},delay);
           }
         }
    const handleinput=()=>{
      const query = input.value.toLowerCase();
      console.log("query:", query);
      suggestions.innerHTML = "";

      if (query) { 
        const filteredValues = response.filter((item) =>
          item.toLowerCase().startsWith(query)
        );
        console.log("filteredValues:", filteredValues);
        filteredValues.forEach((item) => {
          const suggestedItem = document.createElement("div");
          suggestedItem.textContent = item;
         suggestedItem.classList.add("suggestion-item");
          suggestedItem.addEventListener("click", () => {
            input.value = item;
            suggestions.innerHTML = ""; 
          });

          suggestions.appendChild(suggestedItem);
        });
      }
    };

    input.addEventListener("input",debounce(handleinput,300));
  })
  .catch((error) => {
    console.error(error);
  });
