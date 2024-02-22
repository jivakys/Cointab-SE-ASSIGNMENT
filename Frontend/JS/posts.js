document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const posts = await (await fetch(`/users/${userId}`)).json();
  let html = "";
  posts.forEach((post) => {
    html += `<div>
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>`;
  });
  document.getElementById("posts").innerHTML = html;
});
