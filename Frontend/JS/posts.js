document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const postContainer = document.getElementById("postContainer");
  const bulkAddBtn = document.getElementById("bulkAddBtn");
  const downloadExcelBtn = document.getElementById("downloadExcelBtn");

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => {
      if (posts.length > 0) {
        posts.forEach((post) => {
          const postDiv = document.createElement("div");
          postDiv.classList.add("post");
          postDiv.innerHTML = `
                        <h3>Title: ${post.title}</h3>
                        <p>${post.body}</p>
                        <p><strong>User ID:</strong> ${post.userId}</p>
                        <p><strong>Company:</strong> ${post.company}</p>
                    `;
          postContainer.appendChild(postDiv);
        });

        downloadExcelBtn.style.display = "block";
      } else {
        const noPostsMsg = document.createElement("p");
        noPostsMsg.textContent = "No posts found for this user.";
        postContainer.appendChild(noPostsMsg);
      }
    })
    .catch((error) => console.error("Error fetching posts:", error));

  bulkAddBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/posts/bulkAddPosts/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to bulk add posts");
        }
        bulkAddBtn.style.display = "none";
        downloadExcelBtn.style.display = "block";
      })
      .catch((error) => {
        console.error("Error bulk adding posts:", error);
      });
  });

  downloadExcelBtn.addEventListener("click", () => {
    window.location.href = `http://localhost:3000/posts/downloadPostsInExcel/${userId}`;
  });
});
