# Rota de Registro de Customer

## **POST** `/user`

### **Descrição**
Essa rota é utilizada para registrar um novo customer na aplicação.

### **Dados Esperados**
O corpo da requisição deve ser um JSON com os seguintes campos:

| Campo            | Tipo    | Validações                                                                                                                                                    |
|------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`           | string  | Obrigatório. Deve ter entre 3 e 60 caracteres e conter apenas letras.                                                                                         |
| `email`          | string  | Obrigatório. Deve ser um email válido.                                                                                                                        |
| `password`       | string  | Obrigatório. Deve ter no mínimo 6 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial.                     |
| `confirmPassword`| string  | Obrigatório. Deve ser igual ao campo `password`.                                                                                                               |
| `acceptedTerms`  | boolean | Obrigatório. Deve ser `true` para indicar que os termos foram aceitos.                                                                                        |

### **Exemplo de Requisição**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "Passw0rd!",
  "confirmPassword": "Passw0rd!",
  "acceptedTerms": true
}
```

### Respostas

- **204 No Content**  
  Indica que o registro foi realizado com sucesso e não há conteúdo a ser retornado.

- **400 Bad Request**  
  Indica que houve um erro de validação em um ou mais campos. A resposta conterá detalhes dos erros.

  **Exemplo de Resposta:**
  ```json
  {
    "errors": [
      "O nome deve conter entre 3 e 60 caracteres e apenas letras.",
      "O email deve ser válido." 
    ]
  }
  ```
- **500 ServerError**  
  Indica que houve um erro no servidor ao processar a requisição.
