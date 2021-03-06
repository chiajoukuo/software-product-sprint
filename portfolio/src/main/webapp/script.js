// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function formSettingOnLoad() {
  const comments = fetch('/data').then(response => response.json()).then((comments) => {
		console.log("comments", comments);
		const commentsList = document.getElementById('comments-container');
		commentsList.innerHTML = '';
		for(var i=0; i<comments.length; i++){
				commentsList.appendChild(createListElement(comments[i]));		
		}
		// Set blob url
		fetch('/blobstore-upload-url')
			.then((response) => {
			return response.text();
			})
			.then((imageUploadUrl) => {
			const commentForm = document.getElementById('my-form');
			commentForm.action = imageUploadUrl;
			console.log("blobstore upload url", imageUploadUrl);
			commentForm.classList.remove('hidden');
			});
	})
}

function createListElement(comment) {
  var liElement = document.createElement('div');
	if(comment.message){
		var messageElement = document.createElement('span');
		messageElement.innerText=comment.message;
		liElement.appendChild(messageElement); 
	}
  if(comment.imageUrl){
		var imgElement = document.createElement("IMG");
		imgElement.setAttribute("src", comment.imageUrl);
		imgElement.setAttribute("height", "80");
		imgElement.setAttribute("style", "margin-left:5px");
		liElement.appendChild(imgElement); 
	}
  return liElement;
}
