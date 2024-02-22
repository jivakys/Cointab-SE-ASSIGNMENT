document.getElementById("allUsers").addEventListener("click", async () => {
  const response = await fetch("/users");
  const users = await response.json();
  let html = "";
  users.forEach((user) => {
    html += `<div>
                            <h2>${user.name}</h2>
                            <p>Email: ${user.email}</p>
                            <p>Phone: ${user.phone}</p>
                            <p>Website: ${user.website}</p>
                            <p>City: ${user.city}</p>
                            <p>Company: ${user.company.name}</p>
                            <button data-id="${user.id}" class="open">Open</button>
                            <button data-id="${user.id}" style="display: none" class="add">Add</button>
                        </div>`;
  });
  document.getElementById("users").innerHTML = html;
  const addButtons = document.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const response = await fetch("/users/check/" + button.dataset.id);
      const { exists } = await response.json();
      if (exists) {
        button.style.display = "none";
        const openButton = button.previousElementSibling;
        openButton.style.display = "inline-block";
      } else {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("website", user.website);
        formData.append("city", user.city);
        formData.append("company", user.company.name);
        fetch("/users/add", { method: "POST", body: formData });
      }
    });
  });
  const openButtons = document.querySelectorAll(".open");
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.dataset.id;
      window.location.href = `/users/${userId}`;
    });
  });
});
