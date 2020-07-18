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
  const messages = fetch('/data').then(response => response.json()).then((messages) => {
		const messagesList = document.getElementById('messages-container');
		messagesList.innerHTML = '';
		for(var i=0; i<messages.length; i++){
				messagesList.appendChild(createListElement(messages[i]));		
		}
		// Set blob url
		fetch('/blobstore-upload-url')
			.then((response) => {
			return response.text();
			})
			.then((imageUploadUrl) => {
			const messageForm = document.getElementById('my-form');
			messageForm.action = imageUploadUrl;
			console.log("blobstore upload url", imageUploadUrl);
			messageForm.classList.remove('hidden');
			});
	})
}

function createListElement(text) {
  const liElement = document.createElement('p');
  liElement.innerText = text;
  return liElement;
}
