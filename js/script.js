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

//отрисовка
const copyListData = [...listData]
for (const oneUser of copyListData) {
    oneUser.FIO = oneUser.name + ' ' + oneUser.surename + " " + oneUser.lastname
    oneUser.birtYear = new Date().getFullYear() - oneUser.age
}

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

