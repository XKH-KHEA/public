document.addEventListener("DOMContentLoaded", function () {
    const blogPosts = [
      {
        title: "First Blog Post",
        date: "January 1, 2024",
        content: "This is the content of the first blog post."
      },
      {
        title: "Second Blog Post",
        date: "February 1, 2024",
        content: "This is the content of the second blog post."
      }
      // Add more blog posts here
    ];
  
    const blogContainer = document.querySelector(".blog-posts");
  
    blogPosts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("blog-post");
      
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.title;
      postElement.appendChild(postTitle);
  
      const postDate = document.createElement("p");
      postDate.classList.add("post-date");
      postDate.textContent = post.date;
      postElement.appendChild(postDate);
  
      const postContent = document.createElement("p");
      postContent.classList.add("post-content");
      postContent.textContent = post.content;
      postElement.appendChild(postContent);
  
      blogContainer.appendChild(postElement);
    });
  });
  