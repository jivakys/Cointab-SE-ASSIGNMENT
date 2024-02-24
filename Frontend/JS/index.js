document.addEventListener("DOMContentLoaded", () => {
  const allUsersBtn = document.getElementById("allUsersBtn");
  const usersList = document.getElementById("usersList");

  allUsersBtn.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        usersList.innerHTML = "";
        data.forEach((user) => {
          const userDiv = document.createElement("div");
          userDiv.classList.add("user");
          userDiv.innerHTML = `
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Website:</strong> ${user.website}</p>
                        <p><strong>City:</strong> ${user.address.city}</p>
                        <p><strong>Company:</strong> ${user.company.name}</p>
                        <button class="addBtn">Add</button>
                        <button class="openBtn" style="display:none;">Open</button>
                    `;
          usersList.appendChild(userDiv);

          const addBtn = userDiv.querySelector(".addBtn");
          const openBtn = userDiv.querySelector(".openBtn");

          fetch(
            `https://cointab-backend-production-e732.up.railway.app/users/fetchUserByEmail/${user.email}`
          )
            .then((response) => response.json())
            .then((userData) => {
              if (userData) {
                addBtn.style.display = "none";
                openBtn.style.display = "block";
              }
            })
            .catch((error) => console.error("Error fetching user:", error));

          addBtn.addEventListener("click", () => {
            const requestBody = {
              name: user.name,
              email: user.email,
              phone: user.phone,
              website: user.website,
              city: user.address.city,
              company: user.company.name,
            };
            fetch(
              "https://cointab-backend-production-e732.up.railway.app/users/addUser",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to add user");
                }
                addBtn.style.display = "none";
                openBtn.style.display = "block";
                openBtn.style.backgroundColor = "#a1cbf8";
              })
              .catch((error) => {
                console.error("Error adding user:", error);
              });
          });

          openBtn.addEventListener("click", () => {
            window.location.href = `post.html?userId=${user.id}`;
          });
        });
      })
      .catch((error) => console.error("Error fetching users:", error));
  });
});
