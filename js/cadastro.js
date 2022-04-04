const fields = document.querySelectorAll('[required]')

for (field of fields) {
  field.addEventListener('invalid', event => {
    // eliminar o bubble
    event.preventDefault()
  })
}

function mePertube() {
  var status
  var spanError
  for (field of fields) {
    if (field.validity.valueMissing) {
      spanError = field.parentNode.querySelector('span.error')
      spanError.classList.add('active')
      spanError.innerHTML = 'Preenchimento obrigatório!'
    }
  }
  if (
    fields[0].validity.valid &&
    fields[1].validity.valid &&
    fields[2].validity.valid &&
    fields[3].validity.valid &&
    fields[4].validity.valid
  ) {
    alert('Obrigado ' + fields[0].value)
  }
}

function setErroNome() {
  const spanError = fields[0].parentNode.querySelector('span.error')
  if (fields[0].validity.valueMissing) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Preenchimento obrigatório!'
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function setErroEmail() {
  const spanError = fields[1].parentNode.querySelector('span.error')
  if (fields[1].validity.valueMissing) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Preenchimento obrigatório!'
  } else if (!fields[1].validity.valid) {
    spanError.classList.add('active')
    spanError.innerHTML = 'E-mail inválido!'
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function setErrorCPFOnKeyUp() {
  const spanError = fields[2].parentNode.querySelector('span.error')
  if (fields[2].value.length == 14) {
    if (validateCPF(removeCaracteres(fields[2].value))) {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    } else {
      spanError.classList.add('active')
      spanError.innerHTML = 'CPF invalido'
    }
  }
}

function setErrorCPFOnBlur() {
  const spanError = fields[2].parentNode.querySelector('span.error')
  if (fields[2].value.length < 14 && fields[2].value.length > 0) {
    spanError.classList.add('active')
    spanError.innerHTML = 'CPF incompleto!'
  } else if (fields[2].value.length == 0) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Preenchimento obrigatório!'
  }
}

function mascaraCPF(i) {
  var v = i.value

  if (isNaN(v[v.length - 1])) {
    // impede entrar outro caractere que não seja número
    i.value = v.substring(0, v.length - 1)
    return
  }

  i.setAttribute('maxlength', '14')
  if (v.length == 3 || v.length == 7) i.value += '.'
  if (v.length == 11) i.value += '-'
}

function setErrorTelefone() {
  const spanError = fields[3].parentNode.querySelector('span.error')
  if (
    removeCaracteres(fields[3].value).length == 11 ||
    removeCaracteres(fields[3].value).length == 10
  ) {
    if (removeCaracteres(fields[3].value).length < 9) {
      spanError.classList.add('active')
      spanError.innerHTML = 'Numero invalido'
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    }
  } else if (
    removeCaracteres(fields[3].value).length < 11 &&
    removeCaracteres(fields[3].value).length > 0
  ) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Telefone incompleto!'
  } else if (removeCaracteres(fields[3].value).length == 0) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Preenchimento obrigatório!'
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function mascaraTelefone(i) {
  var v = i.value
  var isMovel = false
  var a = Array.from(i.value)

  i.setAttribute('maxlength', '16')
  if (v.length == 1) i.value = '(' + i.value
  if (v.length == 3) i.value += ')'
  if (v.length == 3) i.value += ' '

  if (a[5] == 9) {
    isMovel = true
  } else {
    isMovel = false
  }
  if (isMovel) {
    if (v.length == 6) i.value += ' '
    if (v.length == 11) i.value += '-'
  }
  if (!isMovel) {
    if (v.length == 9) i.value += '-'
  }

  if (removeCaracteres(v).length == 11 || removeCaracteres(v).length == 10) {
    setErrorTelefone()
  }
}

function validarGitUrl() {
  const spanError = fields[4].parentNode.querySelector('span.error')
  if (fields[4].validity.valueMissing) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Preenchimento obrigatório!'
  } else if (fields[4].validity.typeMismatch) {
    spanError.classList.add('active')
    spanError.innerHTML = 'URL invalida!'
  } else if (fields[4].validity.patternMismatch) {
    spanError.classList.add('active')
    spanError.innerHTML = 'Não é uma url do GitHub'
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function validarGitUrlOnKeuUp() {
  const spanError = fields[4].parentNode.querySelector('span.error')
  if (!fields[4].validity.typeMismatch || !fields[4].validity.patternMismatch) {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function removeCaracteres(str) {
  const textAjustado = str.replace(/[^\w\s]/gi, '')
  return removeEspaco(textAjustado)
}

function removeEspaco(str) {
  const textAjustado = str.replace(/\s/g, '')
  return textAjustado
}

function validateCPF(strCPF) {
  var Soma
  var Resto
  Soma = 0
  if (strCPF == '00000000000') return false

  if (strCPF < 11) return false

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11))) return false
  return true
}
