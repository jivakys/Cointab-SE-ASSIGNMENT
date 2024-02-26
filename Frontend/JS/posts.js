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
                        <p><strong>User ID: </strong> ${post.userId}</p>
                        <h3><strong>Title: </strong> ${post.title}</h3>
                        <p><strong>Body: </strong> ${post.body}</p>
                    `;
          postContainer.appendChild(postDiv);
        });

        // downloadExcelBtn.style.display = "block";
      } else {
        const noPostsMsg = document.createElement("p");
        noPostsMsg.textContent = "No posts found for this user.";
        postContainer.appendChild(noPostsMsg);
      }
    })
    .catch((error) => console.error("Error fetching posts:", error));

  bulkAddBtn.addEventListener("click", () => {
    fetch(
      `https://cointab-backend-production-e732.up.railway.app/posts/bulkAddPosts/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to bulk add posts");
        }
        bulkAddBtn.style.display = "none";
        alert("Post data added to Database");
        downloadExcelBtn.style.display = "block";
      })
      .catch((error) => {
        console.error("Error bulk adding posts:", error);
      });
  });

  downloadExcelBtn.addEventListener("click", async () => {
    try {
      const postsData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const posts = await postsData.json();

      if (!posts || posts.length === 0) {
        alert("No posts found for download.");
        return;
      }

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(posts);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");
      const filename = `user_${userId}_posts.xlsx`;
      XLSX.writeFile(workbook, filename);

      alert("Excel file downloaded successfully.");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      alert("Error downloading Excel file. Please try again.");
    }
  });
});
