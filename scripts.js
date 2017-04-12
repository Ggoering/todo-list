onPageLoad()
function onPageLoad() {
  appendFromArray(getStorage())
}
function appendFromArray(getStorage) {
  getStorage.forEach(function (element) {
    prependCard(element)
  })
}
$('header').on('input', '.body-storage, .title-storage', enableSave)
$('.save-btn').on('click', saveCard)
$('.save-btn').on('click', clearInputFields)
$('.save-btn').on('click', enableSave)
function saveCard() {
storeLocally(updateCardArray(getStorage(), addCard()));
prependCard(addCard());
}
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.importanceArray = ['None', 'Low', 'Normal', 'High', 'Critical']
  this.importanceLevel = 0
  this.importance = this.importanceArray[this.importanceLevel];
}
addCard = function() {
var $title = $('.title-storage').val();
var $body = $('.body-storage').val()
var idea = new Idea($title, $body)
return idea
}
function prependCard(addCard) {
  $('.card-container').prepend(
    `<article class="todo-card" id=${addCard.id}>
      <div class="searchable">
        <div class="card-header">
          <h2 contenteditable="true">${addCard.title}</h2>
          <button class="delete-icon" type="button" name="delete-button"></button>
        </div>
        <p class="body-text" contenteditable="true">${addCard.body}</p>
      <div class="quality-container">
        <button class="upvote-icon" type="button" name="upvote-btn"></button>
        <button class="downvote-icon" type="button" name="downvote-btn"></button>
        <p class="quality-text">${addCard.importance}</p>
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
function clearInputFields() {
  $('.title-storage').val('');
  $('.body-storage').val('');
}
function enableSave() {
  var $title = $('.title-storage').val();
  var $body = $('.body-storage').val();
  if ($title !== '' && $body !== '') {
    toggleSaveDisable(false);
  } else {
    toggleSaveDisable(true);
  }
}
function toggleSaveDisable(value) {
  $('.save-btn').prop('disabled', value);
}
$('.card-container').on('click', '.upvote-icon', upVote)
function upVote() {
  var $cardID = $(this).closest('.todo-card').attr('id')
  var $upBtn = $(this)
  storeLocally(increaseImportanceArray(getStorage(), $cardID))
  clearCards()
  appendFromArray(getStorage())
}
function increaseImportanceArray(getStorage, $cardID) {
var tempArray = getStorage
for (var i = 0; i < tempArray.length; i++) {
 while ($cardID == tempArray[i].id && tempArray[i].importanceLevel < tempArray[i].importanceArray.length - 1){
  tempArray[i].importanceLevel++
  tempArray[i].importance = tempArray[i].importanceArray[tempArray[i].importanceLevel]
  break
  }
  continue
}
return tempArray
}
$('.card-container').on('click', '.downvote-icon', downVote)
function downVote() {
  var $cardID = $(this).closest('.todo-card').attr('id')
  var $upBtn = $(this)
  storeLocally(decreaseImportanceArray(getStorage(), $cardID))
  clearCards()
  appendFromArray(getStorage())
}

function decreaseImportanceArray(getStorage, $cardID) {
var tempArray = getStorage
  for (var i = 0; i < tempArray.length; i++) {
    while ($cardID == tempArray[i].id && tempArray[i].importanceLevel > 0){
      tempArray[i].importanceLevel--
      tempArray[i].importance = tempArray[i].importanceArray[tempArray[i].importanceLevel]
      break
      }
    continue
    }
  return tempArray
}

function clearCards() {
  $('.card-container').html('')
}

function deleteObject(getStorage, $cardID, $card) {
  var newArray = getStorage
  newArray.forEach(function(element, index, array) {
    if (element.id == $cardID) {
      console.log(element)
      console.log(element.id, "made it past")
      console.log(array)
      newArray.splice(index, 1)
    }
    else {
      return newArray
    }
  })
  $($card).remove()
  return newArray;
}

$('.card-container').on('click', '.delete-icon', deleteCard)
  function deleteCard() {
  var $cardID = $(this).closest('.todo-card').attr('id')
  var $card = $(this).closest('.todo-card')
  storeLocally(deleteObject(getStorage(), $cardID, $card))
}

$('.search-input').on('input', searchCards)
function searchCards() {
  var something = $(this)
  var searchInput = $('.search-input').val().toLowerCase();
  $('.searchable').each(function() {
    var cardText = $(this).text().toLowerCase();
    if (cardText.indexOf(searchInput) != -1) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  })
}
