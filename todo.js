//database array:
var list_items_all = [];

//Queryselectors:
var add_btn = document.querySelector(".entry-add");
var text_input = document.querySelector(".entry-text");
var filters = document.querySelector(".footer");
var items_list = document.querySelector(".list");

//Event listeners:
add_btn.addEventListener("click", logEntry);
text_input.addEventListener("keydown", logEntry);
filters.addEventListener("click", filter);

//<--------------------Event trigger functions-------------------------->

//Insert new list entry.
function logEntry(event) {
  var new_item = document.createElement("li"); //Creating new li element.
  var new_input = document.querySelector(".entry-text").value; //Storing text into variable.
  if (
    (new_input !== "" && event.keyCode == 13) ||
    (new_input !== "" && event.target === add_btn)
  ) {
    new_item.className = "list-item displayed frame flex"; //Assigning new li classes.
    new_item.innerHTML =
      '<i class="btn far fa-check-circle unchecked "></i><i class="btn far fa-star unstarred"></i><span class="content"></span><i class="btn far fa-times-circle delete"></i>'; //Using innerHTML to create li cild elements.
    list_items_all.push(new_item); //Add li to list_items_all.
    items_list.insertBefore(new_item, items_list.firstChild); //Insert li into DOM.
    items_list.querySelector(".content").textContent = new_input; //insert text into span of li
    text_input.value = ""; //clear input text box.
    items_list.addEventListener("click", entryButtons); //add event listener to li, to be picked up by buttons.
    if (!filters.firstElementChild.classList.contains("active")) {
      //If filter other than "all" is active, remove element from DOM)
      var dom_items = items_list.querySelectorAll(".deleted");
      dom_items.forEach(item => item.remove()); //Removes deleted entrys from DOM.
      filterRevertAll(); //Sets filter_all as the active filter.
    }
  }
}

//Check for click events on entry buttons.
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

//Check for click events on filter buttons.
function filter(event) {
  var all_items = document.querySelectorAll(".list-item"); //Stors list items into node list
  all_items.forEach(item => item.remove()); //removes every list item from DOM.
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

//Delete entries from DOM.
function deleteItem() {
  var index = list_items_all.indexOf(event.target.parentNode); //Stores deleted li's index.
  event.target.parentNode.remove(); //Removes li from DOM.
  event.target.parentNode.removeChild(event.target); //Removes ".delete" button from li.
  list_items_all[index].innerHTML +=
    '<i class="btn restore fas fa-trash-restore-alt"></i><i class="btn destroy fas fa-trash-alt"></i>'; //Adds ".restore" and "destroy" buttons to li.
  list_items_all[index].classList.remove("displayed");
  list_items_all[index].classList.add("deleted");
}

//restore deleted entries.
function restoreItem() {
  var index = list_items_all.indexOf(event.target.parentNode); //Stores deleted li's index.
  var tbd = list_items_all[index].querySelector(".restore");
  tbd.remove(); //Removes ".restore" i element.
  var tbd = list_items_all[index].querySelector(".destroy");
  tbd.remove(); //Removes ".destroy" i element.
  list_items_all[index].innerHTML +=
    '<i class="btn delete far fa-times-circle"></i>';
  list_items_all[index].className = "list-item displayed frame flex"; //Changes li class name from "deleted" to "displayed".
  list_items_all[index].remove(); //Removes li from DOM.
}

//Permanently remove deleted items from list_items_all.
function destroyItem() {
  var index = list_items_all.indexOf(event.target.parentNode); //Storing deleted li's index.
  list_items_all.splice(index, 1); //Removes lifrom array
  event.target.parentNode.remove(); //Removes li from DOM.
}

//<---------------------Filter functions-------------------------->

//Filter(): all entries in DOM.
function filterAll() {
  for (var item of list_items_all) {
    if (item.classList.contains("displayed")) {
      items_list.insertBefore(item, items_list.firstChild); //Insert li into DOM.
    }
  }
}

//Filter(): Checked entries in DOM.
function filterChecked() {
  var filter = filters.querySelector(".filter_checked");
  for (var item of list_items_all) {
    if (
      item.classList.contains("displayed") &&
      item.querySelector(".checked")
    ) {
      items_list.insertBefore(item, items_list.firstChild); //Insert li into DOM.
    } else if (
      filter.classList.contains("active") &&
      item.querySelector(".unchecked")
    ) {
      //Checkes if unchecked while in filter_checked active.
      item.remove();
    }
  }
}

//Filter(): Starred entries in DOM.
function filterStarred() {
  var filter = filters.querySelector(".filter_starred");
  for (var item of list_items_all) {
    if (
      item.classList.contains("displayed") &&
      item.querySelector(".starred")
    ) {
      items_list.insertBefore(item, items_list.firstChild); //Insert li into DOM.
    } else if (
      filter.classList.contains("active") &&
      item.querySelector(".unstarred")
    ) {
      //checks if unstarred while in "filter_star" active.
      item.remove();
    }
  }
}

//Filter(): Deleted entries in DOM.
function filterDeleted() {
  for (var item of list_items_all) {
    if (item.classList.contains("deleted")) {
      items_list.insertBefore(item, items_list.firstChild); //Insert li into DOM.
    }
  }
}

//Adds ".active" class to active filter.
function filterFocus(event) {
  var filter_list = filters.querySelectorAll(".filter");
  for (var filter of filter_list) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
    event.target.classList.add("active");
  }
}

//Reverts to filter_all when a new entry is made.
function filterRevertAll() {
  var filter_list = filters.querySelectorAll(".filter");
  for (var filter of filter_list) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active"); //removes "active" class from current filter.
    }
  }
  filter_list[0].classList.add("active"); //Adds "active" class to filter_all.
  filterAll(); //Call function to build all "displayed" antries in DOM.
}

//Checks for unchecking or unstarring entries while filter is active. if true, removes entry from DOM.
function filterQuery() {
  var check = filters.querySelector(".filter_checked");
  var star = filters.querySelector(".filter_starred");
  for (var item of list_items_all) {
    if (
      check.classList.contains("active") &&
      item.querySelector(".unchecked")
    ) {
      //Checkes if unchecked while in filter_checked active.
      item.remove();
    } else if (
      star.classList.contains("active") &&
      item.querySelector(".unstarred")
    ) {
      //checks if unstarred while in "filter_star" active.
      item.remove();
    }
  }
}
