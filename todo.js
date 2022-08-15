
var list_items_all = [];
var add_btn = document.querySelector(".entry-add");
var text_input = document.querySelector(".entry-text");
var filters = document.querySelector(".footer");
var items_list = document.querySelector(".list");
add_btn.addEventListener("click", logEntry);
text_input.addEventListener("keydown", logEntry);
filters.addEventListener("click", filter);

//--------------------Event trigger functions--------------------------


function logEntry(event) {
  var new_item = document.createElement("li"); 
  var new_input = document.querySelector(".entry-text").value; 
  if (
    (new_input !== "" && event.keyCode == 13) ||
    (new_input !== "" && event.target === add_btn)
  ) {
    new_item.className = "list-item displayed frame flex"; 
    new_item.innerHTML =
      '<i class="btn far fa-check-circle unchecked "></i><i class="btn far fa-star unstarred"></i><span class="content"></span><i class="btn far fa-times-circle delete"></i>';
    list_items_all.push(new_item); 
    items_list.insertBefore(new_item, items_list.firstChild); 
    items_list.querySelector(".content").textContent = new_input; 
    text_input.value = ""; 
    items_list.addEventListener("click", entryButtons); 
    if (!filters.firstElementChild.classList.contains("active")) {
      var dom_items = items_list.querySelectorAll(".deleted");
      dom_items.forEach(item => item.remove()); 
      filterRevertAll(); 
    }
  }
}

//----- Click Event-------
function entryButtons(event) {
  if (event.target.classList.contains("unstarred")) {
    event.target.classList.remove("unstarred");
    event.target.classList.add("starred");
  } else if (event.target.classList.contains("starred")) {
    event.target.classList.remove("starred");
    event.target.classList.add("unstarred");
    filterQuery();
  } else if (event.target.classList.contains("unchecked")) {
    event.target.classList.remove("unchecked");
    event.target.classList.add("checked");
  } else if (event.target.classList.contains("checked")) {
    event.target.classList.remove("checked");
    event.target.classList.add("unchecked");
    filterQuery();
  } else if (event.target.classList.contains("delete")) {
    deleteItem();
  } else if (event.target.classList.contains("restore")) {
    restoreItem();
  } else if (event.target.classList.contains("destroy")) {
    destroyItem();
  }
}

//---------Event button
function filter(event) {
  var all_items = document.querySelectorAll(".list-item"); 
  all_items.forEach(item => item.remove()); 
  if (event.target.classList.contains("filter_all")) {
    filterAll();
    filterFocus(event);
  } else if (event.target.classList.contains("filter_checked")) {
    filterChecked();
    filterFocus(event);
  } else if (event.target.classList.contains("filter_starred")) {
    filterStarred();
    filterFocus(event);
  } else if (event.target.classList.contains("filter_deleted")) {
    filterDeleted();
    filterFocus(event);
  }
}

//<---------------------Delete functions-------------------------->

//-------- Delete button
function deleteItem() {
  var index = list_items_all.indexOf(event.target.parentNode); 
  event.target.parentNode.remove(); 
  event.target.parentNode.removeChild(event.target); 
  list_items_all[index].innerHTML +=
    '<i class="btn restore fas fa-trash-restore-alt"></i><i class="btn destroy fas fa-trash-alt"></i>'; 
  list_items_all[index].classList.remove("displayed");
  list_items_all[index].classList.add("deleted");
}

//------- Restore butoon
function restoreItem() {
  var index = list_items_all.indexOf(event.target.parentNode); 
  var tbd = list_items_all[index].querySelector(".restore");
  tbd.remove(); 
  var tbd = list_items_all[index].querySelector(".destroy");
  tbd.remove(); 
  list_items_all[index].innerHTML +=
    '<i class="btn delete far fa-times-circle"></i>';
  list_items_all[index].className = "list-item displayed frame flex"; 
  list_items_all[index].remove();
}

//---- delete (destroy button)
function destroyItem() {
  var index = list_items_all.indexOf(event.target.parentNode); 
  list_items_all.splice(index, 1); 
  event.target.parentNode.remove(); 
}

//<---------------------Filter functions-------------------------->

//-------------Filter()
function filterAll() {
  for (var item of list_items_all) {
    if (item.classList.contains("displayed")) {
      items_list.insertBefore(item, items_list.firstChild); 
    }
  }
}

//--------- filter Check
function filterChecked() {
  var filter = filters.querySelector(".filter_checked");
  for (var item of list_items_all) {
    if (
      item.classList.contains("displayed") &&
      item.querySelector(".checked")
    ) {
      items_list.insertBefore(item, items_list.firstChild); 
    } else if (
      filter.classList.contains("active") &&
      item.querySelector(".unchecked")
    ) {
      
      item.remove();
    }
  }
}


function filterStarred() {
  var filter = filters.querySelector(".filter_starred");
  for (var item of list_items_all) {
    if (
      item.classList.contains("displayed") &&
      item.querySelector(".starred")
    ) {
      items_list.insertBefore(item, items_list.firstChild);
    } else if (
      filter.classList.contains("active") &&
      item.querySelector(".unstarred")
    ) {
     
      item.remove();
    }
  }
}

//Filter(): Deleted
function filterDeleted() {
  for (var item of list_items_all) {
    if (item.classList.contains("deleted")) {
      items_list.insertBefore(item, items_list.firstChild); 
    }
  }
}

//---- active button 
function filterFocus(event) {
  var filter_list = filters.querySelectorAll(".filter");
  for (var filter of filter_list) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
    event.target.classList.add("active");
  }
}

//Reverts to filter 
function filterRevertAll() {
  var filter_list = filters.querySelectorAll(".filter");
  for (var filter of filter_list) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active"); 
    }
  }
  filter_list[0].classList.add("active"); 
  filterAll(); 
}

//Check mark 
function filterQuery() {
  var check = filters.querySelector(".filter_checked");
  var star = filters.querySelector(".filter_starred");
  for (var item of list_items_all) {
    if (
      check.classList.contains("active") &&
      item.querySelector(".unchecked")
    ) {
      
      item.remove();
    } else if (
      star.classList.contains("active") &&
      item.querySelector(".unstarred")
    ) {
      
      item.remove();
    }
  }
}
