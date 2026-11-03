const fetchbtn = document.getElementById("fetch-btn");
const searchInput = document.getElementById("search-input");
const addDummybtn = document.getElementById("add-dummy-btn");
const statusMsg = document.getElementById("status-msg");
const userGrid = document.getElementById("user-grid");

let usersData = [];

fetchbtn.addEventListener("click", async () => {
  statusMsg.textContent = "Loading users from api ......";
  userGrid.innerHTML = "";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("failed to fetch data");

    usersData = await response.json();
    console.log(usersData);
    searchInput.disabled = false;
    addDummybtn.disabled = false;

    renderUsers(usersData);
  } catch (error) {
    ((statusMsg.textContent = "❌ Error loading data: "), error.message);
    statusMsg.style.color = "red";
  }
});

function userCardElement(user) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", user.id);

  card.innerHTML = `
        <h3>${user.name}</h3>
        <p> <strong>Email:</strong>${user.email}</p>
        <p> <strong>City:</strong>${user.address ? user.address.city : "N/A"}</p>
        <button class="delete-btn">Delete User</button>
    `;
  return card;
}

function renderUsers(users) {
  userGrid.innerHTML = "";
  if (users.length === 0) {
    userGrid.innerHTML = `<p>No users found</p>`;
    return;
  }
  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const card = userCardElement(user);
    fragment.appendChild(card);
  });

  userGrid.appendChild(fragment);
}

userGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const cardNode = event.target.closest(".card");
    const UserId = parseInt(cardNode.getAttribute("data-id"));

    usersData = usersData.filter((u) => u.id !== UserId);

    cardNode.remove();
  }
});
