document.getElementById('submit-comment').addEventListener('click', function() {
    var commentInput = document.getElementById('comment-input');
    var commentList = document.getElementById('comment-list');

    var username = "Username";

    if (commentInput.value.trim() !== "") {
        var newComment = document.createElement('li');
        newComment.classList.add('comment-item');
        
        // Creating elements for icon, username, and comment
        var icon = document.createElement('div');
        icon.classList.add('icon');
        icon.textContent = username.charAt(0); // Display the first letter of the username
        
        var usernameElem = document.createElement('div');
        usernameElem.classList.add('username');
        usernameElem.textContent = username;
        
        var commentText = document.createElement('div');
        commentText.classList.add('comment-text');
        commentText.textContent = commentInput.value;
        
        // Append icon, username, and comment text to the new comment
        newComment.appendChild(icon);
        newComment.appendChild(usernameElem);
        newComment.appendChild(commentText);
        
        commentList.appendChild(newComment);
        commentInput.value = ""; // Clear the comment input field
    } else {
        alert("Please write a comment before submitting.");
    }
});

document.getElementById('upvote-button').addEventListener('click', function() {
    var upvoteCountElem = document.getElementById('upvote-count');
    var currentCount = parseInt(upvoteCountElem.textContent);
    upvoteCountElem.textContent = currentCount + 1;
});

document.getElementById('downvote-button').addEventListener('click', function() {
    var downvoteCountElem = document.getElementById('downvote-count');
    var currentCount = parseInt(downvoteCountElem.textContent);
    downvoteCountElem.textContent = currentCount + 1;
});