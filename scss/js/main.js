const category = document.getElementById('category');
const setting = document.getElementById('setting');
const logoutButton = document.getElementById('logout');
const categoryList = document.querySelector('[data-category-list]');
const subjectsList = document.querySelector('.main__subjects');
const subjectTitle = document.querySelector('.main__subjects-title');
const subjects = document.getElementById('subjects');
const subjectItems = document.querySelector('.main__subjects-item');
const day = document.querySelector('.main__table-day');
var timtables = [];

var tableRowNum = 6;
var tableColNum = 7;



// function drawTimetalbe(row, col) {
//     for (var i = 1; i <= tableRowNum; i++) {
//         for
//     }
// }

var checkLocal = localStorage.getItem('userList');
if (checkLocal) {

}
else {
    window.location.href = "login.html";
}

// TODO: find in timetables where categoryID = cateID
// Get property subjects;
// Gender subjects into HMTL
//  Deadline 12-20-20202f 


function logOut() {
    window.location.href = "login.html";
    localStorage.removeItem('userList');
}

const apiUrl = 'https://5fa90280c9b4e90016e69dba.mockapi.io/timetable';

function RenderCategory() {
    fetch(apiUrl)
        .then(res => res.json())

        .then(data => {
            const categoryItem = data.map(categories => {
                return `
                <label for="show-Subjects" class="main__categories-item" onclick="showSubject(${categories.id})">${categories.name}<br/></label>
                <input hidden type="checkbox" name="" class="show-Subjects" id="show-Subjects-${categories.id}" data-cate-id="${categories.id}">
                `;

            }).join("");
            // console.log(categoryItem);
            console.log(data);
            category.innerHTML = categoryItem;
            // timtables.push(data);
        })

        .catch(error => {
            console.log(error);
        })
}

function showSubject(cateID) {
    console.log(cateID);
    const h = document.getElementById('test1');
    const e = document.querySelector('.main__subjects-title');
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var subjectList = '';
            const selectedSubject = data.map(subject => {
                // return subject.id;
                if (subject.id == cateID) {
                    console.log(subject.subjects);
                    console.log(subject.name);

                    for (let i = 0; i < subject.subjects.length; i++) {
                        subjectList += `<li class="main__subjects-item" draggable="true">${subject.subjects[i].name}</li>`;
                        let subjectDayVal = subject.subjects[i].timtable.day;
                        let subjectWeekVal = subject.subjects[i].timtable.week;
                        document.querySelector(`[data-day=${subjectDayVal}][data-week=${subjectWeekVal}]`)
                    }

                    var subjectName = document.createElement('h4');
                    subjectName.classList.add("title-subject");
                    subjectName.innerText = subject.name;

                    e.appendChild(subjectName);
                    timtables.push(subject.subjects);
                    return subjectList;
                }
            }).join("");
            // console.log(selectedSubject);
            console.log(timtables);
            subjects.innerHTML = selectedSubject;
        }).catch(error => {
            console.log(error);
        })

    categoryList.style.opacity = "0";
    subjectsList.style.opacity = " 1";
    subjectsList.style.zIndex = "1";
}

function createTimeTable(day) {

}

// subjectItems.addEventListener('dragstart', dragStart);
// subjectItems.addEventListener('dragend', dragEnd);

// for (const subjectItem of subjectItems) {
//     subjectItem.addEventListener('dragover', dragOver);
//     subjectItem.addEventListener('dragenter', dragEnter);
//     subjectItem.addEventListener('dragleave', dragLeave);
//     subjectItem.addEventListener('drop', dragDrop);
// }

// function dragStart() {
//     this.className += ' hold';
//     setTimeout(() => (this.className = 'invisible'), 0);
// }

// function dragEnd() {
//     this.className = 'main__subjects-item';
// }

// function dragOver(e) {
//     e.preventDefault();
// }

// function dragEnter(e) {
//     e.preventDefault();
//     this.className += ' hovered';
// }

// function dragLeave() {
//     this.className = 'main__table-day';
// }

// function dragDrop() {
//     this.className = 'main__table-day';
//     this.append(fill);
// }


function back() {
    categoryList.style.opacity = "1";
    subjectsList.style.opacity = " 0";
    RenderCategory();
    // categoryList.style.zIndex = "1";
    // subjectsList.style.zIndex = "2";

}

RenderCategory();


















    // const taskElement = document.importNode(taskTemplate.content, true);
    // const mainSubjects = document.createElement('div');
    // mainSubjects.classList.add('main__subjects');
    // const subjectTitle = document.createElement('div');
    // subjectTitle.classList.add('main__subjects-title');
    // const title = document.createElement('h2');
    // const subjectContent = document.createElement('div');
    // subjectContent.classList.add('main__subjects-content');
    // const subjectContentList = document.createElement('div');
    // subjectContentList.classList.add('main__subjects-list');

    // subjectContent.append(subjectContentList);
    // subjectTitle.appendChild(title);
    // mainSubjects.appendChild(subjectTitle);
    // mainSubjects.appendChild(subjectContent);

    // subjectsList.appendChild(mainSubjects)