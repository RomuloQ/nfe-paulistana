# nfe-paulistana
### exemplo consultar Nfe: 
```typescript

const auth: Config  = {
    certificado: {
        path: "arquivo.pfx",
        senha: "xxxxxxx"
    },
};

const prefeitura = new NfePaulistana(auth);

prefeitura.consultarNFe({
    cnpj: "1231231231",
    inscricaoPrestador: "123123123123",
    numeroNFe : "122"
}).then(nfe => {
    console.log("NFe XML",nfe.xml())
    console.log("NFe JSON",nfe.json())
});
```
