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
		console.log("message", comments[0].message);
		console.log("image", comments[0].imageUrl);
		const commentsList = document.getElementById('comments-container');
		commentsList.innerHTML = '';
		for(var i=0; i<comments.length; i++){
				commentsList.appendChild(createListElement(comments[i].message));		
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

function createListElement(text) {
  const liElement = document.createElement('p');
  liElement.innerText = text;
  return liElement;
}
