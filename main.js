const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
////////////////////////////////////////////////////////////////////
function renderColumn(title, users) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");
  const h3 = document.createElement("h3");
  h3.textContent = title;
  columnDiv.appendChild(h3);
  users.forEach(user => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const nameP = document.createElement("p");
    nameP.textContent = `Name: ${user.name}`;
    cardDiv.appendChild(nameP);
    const usernameP = document.createElement("p");
    usernameP.textContent = `Username: ${user.username}`;
    cardDiv.appendChild(usernameP);

    const websiteP = document.createElement("p");
    websiteP.textContent = `Website: ${user.website}`;
    cardDiv.appendChild(websiteP);
    columnDiv.appendChild(cardDiv);
  });
  const wrapperDiv = document.getElementById("wrapper");
  wrapperDiv.appendChild(columnDiv);
}

async function fetchUsers() {
  const users = await fetch(USERS_ENDPOINT);
  return users;
}

function groupUsersTLD(users) {
  const userGroup = users.reduce((accum, user) => {
    const { website } = user;

    const TLDSplit = website.split(".");
    // Can use .at here as well
    const TLD = TLDSplit[TLDSplit.length - 1];
    // If this is a new TLD intialize with the empty array
    if (!accum[TLD]) accum[TLD] = [];
    // Append the current user to the TLD
    accum[TLD] = [...accum[TLD], user];
    return accum;
  }, {});

  return userGroup;
}

//await fetchUsers();

function main() {
  fetchUsers()
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    })
    .then(users => {
      const userGroups = groupUsersTLD(users);
      Object.entries(userGroups).forEach(([title, users]) => renderColumn(title, users));
    })
    .catch(error => {
      console.log(error);
    });
}

main();
