var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitbutton = document.getElementById("submit");
var nError = document.getElementById("nError");
var uError = document.getElementById("uError");

var currentIndex;

var bookmarks;
if (localStorage.getItem("bookmarkslist") == null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmarkslist"));
  displayWeb();
}
function addWeb() {
  if (submitbutton.innerHTML == "submit") {
    if (
      validation() == true &&
      validatSiteName() == true &&
      validatSiteUrl() == true
    ) {
      var web = {
        Name: siteName.value,
        Url: siteUrl.value,
      };
      bookmarks.push(web);
      localStorage.setItem("bookmarkslist", JSON.stringify(bookmarks));
      displayWeb();
      clear();
      document.getElementById("nameError").classList.add("d-none");
      document.getElementById("urlError").classList.add("d-none");
    } else {
      NameError();
      urlError();
    }
  } else {
    changeUfterUpdate(currentIndex);
  }
}
function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
function displayWeb() {
  var cartoona = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    cartoona += `<div  class='d-flex flex-row  linear '>
        <h2 class='col-1 '> ${bookmarks[i].Name}</h2>
        <a class='  offset-2 btn btn-primary' href='${bookmarks[i].Url}' target="_blank"> Visit </a>
        <button  onclick='deletBookmark(${i})' class=' mx-2 rounded btn btn-danger'>Delete</button>
        <button onclick='Update(${i})'  class=' mx-2 rounded btn btn-warning'>Update</button>
        </div>`;
  }
  document.getElementById("webs").innerHTML = cartoona;
}
function validation() {
  if (siteName.value != "" && siteUrl.value != "") {
    return true;
  } else {
    return false;
  }
}
function NameError() {
  var nameRequired = (document.getElementById(
    "nameError"
  ).innerHTML = `<p class='bg-red'>Name is required</p>`);
  document.getElementById("nameError").classList.remove("d-none");
}
function urlError() {
  var urlError = (document.getElementById(
    "urlError"
  ).innerHTML = `<p  class='bg-red'>Url Field is required </p>`);
  document.getElementById("urlError").classList.remove("d-none");
}
function deletBookmark(index) {
  bookmarks.splice(index, 1);
  displayWeb();
  localStorage.setItem("bookmarkslist", JSON.stringify(bookmarks));
}

function Update(index) {
  currentIndex = index;
  siteName.value = bookmarks[index].Name;
  siteUrl.value = bookmarks[index].Url;
  submitbutton.innerHTML = "Update";
}
function changeUfterUpdate(currentIndex) {
  var web = {
    Name: siteName.value,
    URL: siteUrl.value,
  };
  bookmarks[currentIndex] = web;
  localStorage.setItem("bookmarkslist", JSON.stringify(bookmarks));
  displayWeb();
  clear();
  submitbutton.innerHTML = "submit";
}

function validatSiteName() {
  var regex = /^[A-Za-z][a-z]{1,10}$/;

  if (regex.test(siteName.value) == true) {
    return true;
  } else {
    nError.classList.replace("d-none", "d-block");
    nError.classList.remove("d-block");

    return false;
  }
}
siteName.addEventListener("blur", validatSiteName);

function validatSiteUrl() {
  var regex =
    /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  if (regex.test(siteUrl.value == true)) {
    return true;
  } else {
    uError.classList.replace("d-none", "d-block");
    uError.classList.remove("d-block");
    return false;
  }
}

siteUrl.addEventListener("blur", validatSiteUrl);
