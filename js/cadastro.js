const fields = document.querySelectorAll('[required]')

function validateField(field) {
  function verifyErrors() {
    let errorFound = false
    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        errorFound = error
      }
    }
    return errorFound
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Campo obrigatório'
      },
      email: {
        valueMissing: 'Campo obrigatório',
        typeMismatch: 'E-mail inválido'
      },
      number: {
        valueMissing: 'Campo obrigatório'
      }
    }

    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error')
    if (message) {
      spanError.classList.add('active')
      spanError.innerHTML = message
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    }
  }

  return function () {
    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)
      setCustomMessage(message)
    } else {
      setCustomMessage()
    }

    //telefone
    if (fields[3].value.length < 9 && fields[3].value.length > 0) {
      const spanError = fields[3].parentNode.querySelector('span.error')
      spanError.classList.add('active')
      spanError.innerHTML = 'Numero incompleto'
    }

    //cpf
  
  }
}

function customValidation(event) {
  const field = event.target
  const validation = validateField(field)
  validation()
}

for (field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener('blur', customValidation)
}

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
})

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

function mascaraTelefone(telefone) {
  const textoAtual = telefone.value
  const isCelular = textoAtual.length == 11
  let textAjustado
  if (isCelular) {
    const parte1 = textoAtual.slice(0, 2)
    const parte2 = textoAtual.slice(2, 3)
    const parte3 = textoAtual.slice(3, 7)
    const parte4 = textoAtual.slice(7, 11)
    textAjustado = `${parte1} ${parte2} ${parte3}-${parte4}`
    telefone.value = textAjustado
  } else if (textoAtual.length == 10) {
    const parte1 = textoAtual.slice(0, 2)
    const parte2 = textoAtual.slice(2, 6)
    const parte3 = textoAtual.slice(6, 10)
    textAjustado = `(${parte1}) ${parte2}-${parte3}`
    telefone.value = textAjustado
  } else {
  }
}

function removeCaracteres(str) {
  const textAjustado = str.replace(/[^\w\s]/gi, '')
  return textAjustado
}

function setErrorTelefone() {
  
  const spanError = fields[3].parentNode.querySelector('span.error')
  if (fields[3].value.length == 11 || fields[3].value.length == 10) {
    if (fields[3].value.length < 9) {
      spanError.classList.add('active')
      spanError.innerHTML = 'Numero invalido'
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    }
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}

function validateCPF(strCPF) {
  var Soma
  var Resto
  Soma = 0
  if (strCPF == '00000000000') return false

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

function setErrorCPF() {
  const spanError = fields[2].parentNode.querySelector('span.error')
  if (fields[2].value.length == 14) {
    if (validateCPF(removeCaracteres(fields[2].value))) {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    } else {
      spanError.classList.add('active')
      spanError.innerHTML = 'CPF invalido'
    }
  } else {
    spanError.classList.remove('active')
    spanError.innerHTML = ''
  }
}