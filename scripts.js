onPageLoad()

function onPageLoad() {
  appendFromArray(getStorage())
}

function appendFromArray(getStorage) {
  getStorage.forEach(function (element) {
    prependCard(element)
  })
  }

$('.save-idea').on('click', function () {
  storeLocally(updateCardArray(getStorage(), addCard()));
  prependCard(addCard());
    // clearInputFields();
});

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'quality: swill';
}

addCard = function() {
var $title = $('.title-storage').val();
var $body = $('.body-storage').val()
var idea = new Idea($title, $body)
return idea
}

function prependCard(addCard) {
  $('.idea-container').prepend(
    `<article class="idea-card" id=${addCard.id}>
      <div class="card-header">
        <h2 contenteditable="true">${addCard.title}</h2>
        <button class="delete-icon" type="button" name="delete-button"></button>
      </div>
      <p class="body-text" contenteditable="true">${addCard.body}</p>
      <div class="quality-container">
        <button class="upvote-icon" type="button" name="upvote-btn"></button>
        <button class="downvote-icon" type="button" name="downvote-btn"></button>
        <p class="quality-text">${addCard.quality}</p>
      </div>
    </article>`
  );
}

function getStorage() {
  var getItem =  localStorage.getItem('key') || '[]'
  getItem = JSON.parse(getItem)
  return getItem
}

function updateCardArray(getStorage, addCard) {
  var getStorage1 = getStorage
  getStorage1.push(addCard)
  return getStorage1
}

function storeLocally(updateCardArray) {
  var stringifiedArray = JSON.stringify(updateCardArray);
  localStorage.setItem('key', stringifiedArray);
}

// function retrieveLocally() {
//   var retrievedObject;
//   keyArray.forEach(function (key) {
//     retrievedObject = JSON.parse(localStorage.getItem(key));
//     prependIdea(retrievedObject);
//   });
// }
//
// $('.title-storage').on('input', enableSave);
// $('.body-storage').on('input', enableSave);
//
// function clearInputFields() {
//   var $title = $('.title-storage');
//   var $body = $('.body-storage');
//   $title.val('');
//   $body.val('');
//   toggleSaveDisable();
//   enableSave();
// }
//
// function enableSave() {
//   var $title = $('.title-storage').val();
//   var $body = $('.body-storage').val();
//   if ($title !== '' && $body !== '') {
//     toggleSaveDisable(false);
//   } else {
//     toggleSaveDisable(true);
//   }
// }
//
// function toggleSaveDisable(value) {
//   $('.save-idea').prop('disabled', value);
// }
//

//
// $('.idea-container').on('click', '.upvote-icon', function () {
//   var $qualityElement = $(this).parent().find('.quality-text');
//   if ($qualityElement.text() === 'quality: swill') {
//     $qualityElement.text('quality: plausible');
//   } else if ($qualityElement.text() === 'quality: plausible') {
//     $qualityElement.text('quality: genius');
//   };
// });
//
// $('.idea-container').on('click', '.downvote-icon', function () {
//   var $qualityElement = $(this).parent().find('.quality-text');
//   if ($qualityElement.text() === 'quality: genius') {
//     $qualityElement.text('quality: plausible');
//   } else if ($qualityElement.text() === 'quality: plausible') {
//     $qualityElement.text('quality: swill');
//   };
// });
//
// $('.idea-container').on('click', '.delete-icon', function () {
//   var ideaId = $(this).closest('.idea-card').attr('id');
//   localStorage.removeItem(ideaId);
//   $(this).closest('.idea-card').remove();
// });
