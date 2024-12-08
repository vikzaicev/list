//данные
const listData = [
    {
        name: 'Иван',
        surename: 'Игоревич',
        lastname: 'Петров',
        age: '16',
        hobby: 'Игры'
    },
    {
        name: 'Ира',
        surename: 'Олеговна',
        lastname: 'Воробьева',
        age: '25',
        hobby: 'Танцы'
    }
]


// переменные

const $app = document.getElementById('app')
const $title = document.createElement('h1')

$title.innerText = 'Список'
$title.classList.add('mb3')
$app.append($title)

// таблица
const $table = document.createElement('table')
const $thead = document.createElement('thead')
const $tr = document.createElement('tr')
const $th1 = document.createElement('th')
const $th2 = document.createElement('th')
const $th3 = document.createElement('th')
const $th4 = document.createElement('th')
const $tbody = document.createElement('tbody')

$th1.innerText = 'ФИО'
$th2.innerText = 'Лет'
$th3.innerText = 'Год рождения'
$th4.innerText = 'Хобби'
$table.classList.add('table')
$table.classList.add('table-dark', 'table-striped')

$tr.append($th1, $th2, $th3, $th4)
$thead.append($tr)
$table.append($thead)

$app.append($table)

//форма

const $form = document.createElement('form'),
    $inputName = document.createElement('input'),
    $inputSurename = document.createElement('input'),
    $inputLastname = document.createElement('input'),
    $inputAge = document.createElement('input'),
    $inputHobby = document.createElement('input'),
    $BTNSubmit = document.createElement('button')

$form.classList.add('df', 'mb-3')
$inputName.classList.add('form-control', 'mb-3')
$inputSurename.classList.add('form-control', 'mb-3')
$inputLastname.classList.add('form-control', 'mb-3')
$inputAge.classList.add('form-control', 'mb-3')
$inputHobby.classList.add('form-control', 'mb-3')
$BTNSubmit.classList.add('btn', 'btn-primary')
$BTNSubmit.setAttribute('type', 'submit')
$inputName.setAttribute('placeholder', 'Имя')
$inputSurename.setAttribute('placeholder', 'Отчество')
$inputLastname.setAttribute('placeholder', 'Фамилия')
$inputAge.setAttribute('placeholder', 'Лет')
$inputHobby.setAttribute('placeholder', 'Хобби')

$form.append($inputName, $inputSurename, $inputLastname, $inputAge, $inputHobby, $BTNSubmit)
$BTNSubmit.innerText = 'Добавить'
$title.after($form)

//сортировка
const $BTNSortToLastname = document.createElement('button'),
    $BTNSortToAge = document.createElement('button'),
    $blockBTN = document.createElement('div')

$blockBTN.classList.add('df', 'block')
$BTNSortToAge.classList.add('btn', 'btn-primary')
$BTNSortToLastname.classList.add('btn', 'btn-primary')
$BTNSortToLastname.innerText = 'Сорировать по фамилии'
$BTNSortToAge.innerText = 'Сорировать по возрасту'

$blockBTN.append($BTNSortToLastname, $BTNSortToAge)
$form.after($blockBTN)

//фильтрация

const $filterBlock = document.createElement('div')
$filterBlock.classList.add('df', 'block')
const $titleH2 = document.createElement('h2')
$titleH2.innerText = 'Фильтрация'
$titleH2.classList.add('mb3')
const $formFiltr = document.createElement('form'),
    $inputFIO = document.createElement('input'),
    $inputHobbi = document.createElement('input')
$formFiltr.classList.add('df', 'mb-3')
$inputFIO.classList.add('form-control', 'mb-3')
$inputHobbi.classList.add('form-control', 'mb-3')
$inputFIO.setAttribute('placeholder', 'ФИО')
$inputHobbi.setAttribute('placeholder', 'Хобби')

$formFiltr.append($inputFIO, $inputHobbi)
$filterBlock.append($titleH2, $formFiltr)
$form.after($filterBlock)

// добавление в список
function addTolistData(e) {
    e.preventDefault()
    let user = {
        name: $inputName.value,
        surename: $inputSurename.value,
        lastname: $inputLastname.value,
        age: $inputAge.value,
        hobby: $inputHobby.value
    }

    listData.push(user)

    listDataShow(listData);

    $inputName.value = ''
    $inputSurename.value = ''
    $inputLastname.value = ''
    $inputAge.value = ''
    $inputHobby.value = ''
};

$BTNSubmit.addEventListener('click', addTolistData)


//отрисовка
let sortFlag = "FIO"
let sortDir = true


function listDataShow(listData) {
    $tbody.innerHTML = ''
    let copyListData = [...listData]
    //подготовка

    for (const oneUser of copyListData) {
        oneUser.FIO = oneUser.lastname + ' ' + oneUser.name + " " + oneUser.surename
        oneUser.birtYear = new Date().getFullYear() - oneUser.age
    }
    // фильтрация
    if ($inputFIO.value.toLowerCase().trim() !== '') {
        copyListData = copyListData.filter(function (oneUser) {
            if (oneUser.FIO.toLowerCase().includes($inputFIO.value.trim())) return true
        })
    }
    if ($inputHobbi.value.toLowerCase().trim() !== '') {
        copyListData = copyListData.filter(function (oneUser) {
            if (oneUser.hobby.toLowerCase().includes($inputHobbi.value.trim())) return true
        })
    }
    //сортировка

    copyListData = copyListData.sort(function (a, b) {
        let sort = a[sortFlag] > b[sortFlag]
        if (sortDir == false) sort = a[sortFlag] < b[sortFlag]
        if (sort) return -1;
    })
    // отрисовка
    for (const oneUser of copyListData) {
        const $oneUsertr = document.createElement('tr')
        const $oneUserth1 = document.createElement('th')
        const $oneUserth2 = document.createElement('th')
        const $oneUserth3 = document.createElement('th')
        const $oneUserth4 = document.createElement('th')

        $oneUserth1.innerText = oneUser.FIO
        $oneUserth2.innerText = oneUser.age
        $oneUserth3.innerText = oneUser.birtYear
        $oneUserth4.innerText = oneUser.hobby

        $oneUsertr.append($oneUserth1, $oneUserth2, $oneUserth3, $oneUserth4)
        $tbody.append($oneUsertr)
        $table.append($tbody)
    }
}
listDataShow(listData)

// клики сортировки

$BTNSortToLastname.addEventListener('click', function () {
    sortFlag = 'FIO'
    sortDir = !sortDir
    listDataShow(listData)
})

$BTNSortToAge.addEventListener('click', function () {
    sortFlag = 'age'
    sortDir = !sortDir
    listDataShow(listData)
})

// событие фильтрации
$formFiltr.addEventListener('submit', function (event) {
    event.preventDefault()
})

$inputFIO.addEventListener('input', function () {
    listDataShow(listData)
})
$inputHobbi.addEventListener('input', function () {
    listDataShow(listData)
})