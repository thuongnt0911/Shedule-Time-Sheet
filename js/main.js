const categories = document.getElementById('categories');
const setting = document.getElementById('setting');
const logoutButton = document.getElementById('logout');
const categoryList = document.querySelector('[data-category-list]');
const subjectsList = document.querySelector('.main__subjects');
const subjectTitle = document.querySelector('.main__subjects-title');
const subjects = document.getElementById('subjects');
const subjectItems = document.querySelector('.main__subjects-item');
const saveButton = document.querySelector('.btn-save');
const tbl = document.getElementById('table-content');
const searchButton = document.querySelector('.search__category');
var checkLocal = localStorage.getItem('userList');

/*Check user from local */
if (checkLocal) {
    //
}
else {
    window.location.href = "login.html";
}

const apiUrl = 'https://5fa90280c9b4e90016e69dba.mockapi.io/timetable';

/*Render list categories from Api */
function RenderCategory() {
    fetch(apiUrl)
        .then(res => res.json())

        .then(data => {
            const categoryItem = data.map(category => {
                return `
                <li class="main__categories-item" onclick="showCategory(${category.id})">${category.name}<br/></li>
                `;

            }).join('');
            console.log(data);

            categories.innerHTML = categoryItem;
        })

        .catch(error => {
            console.log(error);
        })
}

/* Show list subjects in category*/
const cateName = document.querySelector('.title-category');
let catData;
var cateID;
function showCategory(cateID) {
    let subjectList = '';
    // cateID = cateID;
    fetch(apiUrl + "/" + cateID)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            catData = data;
            var subjectsArray = data.subjects;
            subjectsArray.forEach(subject => {
                subjectList += `<li class="main__subjects-item" draggable="true" ondragstart=" return drag(event)" ><div class="sub-${subject.id}">${subject.name}</div></li>`;
                let week = document.querySelector("#week-" + subject.timetable.week);
                let day = week.querySelector(".day-" + subject.timetable.day);
                day.setAttribute("id", "sub-" + subject.id);
                day.innerHTML = subject.name;
            });
            var subjectName = document.createElement('h4');
            subjectName.classList.add('title-category');
            subjectTitle.innerText = data.name;
            return subjectList;
        }).then((subjectList) => {
            subjects.innerHTML = subjectList;
        })
    let btnSave = document.querySelector('#save');
    tbl.classList.remove('d-none');
    btnSave.classList.remove('d-none');
    categoryList.style.zIndex = '-1';
    subjectsList.style.zIndex = '1';
    categoryList.style.opacity = '0';
    subjectsList.style.opacity = ' 1';
    categoryList.classList.add('d-none');
    subjectsList.classList.add('d-block');
}

/*Drag drop */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerText);
    ev.dataTransfer.setData("id", ev.target.firstChild.classList[0]);
    return true;
}

function dropElement() {
    let td = document.querySelectorAll('tbody tr td');
    td = Array.prototype.slice.call(td, 0);
    var dragged = '';
    td.forEach(function (element) {
        element.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", element.innerText);
            event.dataTransfer.setData("id", event.target.id);
            dragged = event.target;
        })

        element.addEventListener("dragend", function (event) {

        }, false);

        element.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);

        element.addEventListener("dragenter", function (event) {

        }, false);

        element.addEventListener("dragleave", function (event) {

        }, false);

        element.addEventListener("drop", function (event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var id = event.dataTransfer.getData("id");
            var sub = document.querySelector("#" + id);
            if (sub) {
                if (dragged) {
                    dragged.setAttribute("id", "");
                }
                sub.setAttribute("id", "");
            }
            sub.innerHTML = '';
            event.target.setAttribute("id", id);
            event.target.innerHTML = data;

            let target = event.target;
            var regex = /\d+/g; //\d: number [0-9]
            let idSub = id.match(regex)[0];
            let day = event.target.classList[0].match(regex)[0];
            let week = target.parentElement.id.match(regex)[0];

            updateSub(idSub, week, day);

        }, false);

    });
};

/*Update Subjects */
function updateSub(id, week = 0, day = 0) {
    let subs = catData.subjects;
    subs.forEach(sub => {
        if (sub.id == id) {
            sub.timetable.week = week;
            sub.timetable.day = day;

            console.log(catData);
        }
    });

}

async function postData(data = {}) {
    console.log(data);

    const response = await fetch(apiUrl + "/" + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .catch((e) => {
            console.log(e)
        });
    alert('Time table update successful ! :)))');
    return response.json();

}

/*Back button*/
function back() {
    categoryList.style.opacity = '1';
    subjectsList.style.opacity = ' 0';
    categoryList.style.zIndex = '1';
    subjectsList.style.zIndex = '-1';
    subjectsList.style.position = 'absolute';
    categoryList.classList.add('d-block');

    for (let i = 0; i < [...document.querySelectorAll('td')].length; i++) {
        [...document.querySelectorAll('td')][i].innerText = '';

    }

    clearElement(subjectTitle);
}

/*Search Category */
function showSearchForm() {
    searchButton.style.visibility = 'visible';
}

function search() {
    let input = document.querySelector('.search__category');
    let cateItem = categories.getElementsByTagName("li");
    Array.prototype.forEach.call(cateItem, function (el) {
        if (el.textContent.trim().indexOf(input.value) > -1)
            el.style.display = 'block';
        else el.style.display = 'none';
    });
}

/*Clear first Element*/
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/*Log out */
function logOut() {
    window.location.href = "login.html";
    localStorage.removeItem('userList');
}

dropElement();
RenderCategory();







