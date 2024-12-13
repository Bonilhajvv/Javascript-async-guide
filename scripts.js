//Promessas em JavaScript é um objeto que representa o sucesso ou a falha de uma operação assíncrona.
//Uma função async é uma função que retorna uma promessa, 
// e o await é usado para esperar por essa promessa ser resolvida (ou seja, completada) antes de continuar com o próximo passo.

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {                           //Promisse: retorna algo que pode acontecer ou nao, se ira dar certo ou nao
        const leitor = new FileReader();                                //leitor de arquivo
        leitor.onload = () => {                                         //on load ocorre quando o arquivo é lido com sucesso
            resolve({ url: leitor.result, nome: arquivo.name })         //se der certo ele retorna 
        }

        leitor.onerror = () => {                                         //ocorre quando o arquivo não é lido com sucesso
            reject(`Erro na leitura do arquivo ${arquivo.name}`)        //se der errado ele retorna isso
        }

        leitor.readAsDataURL(arquivo)                                     //le o arquivo e converte o arquivo para uma string
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => { //change: O evento é disparado quando o usuário seleciona um arquivo no input.
    const arquivo = evento.target.files[0];                 //evento.target.files: Retorna uma lista dos arquivos selecionados pelo usuário.[0]: 
    // Seleciona o primeiro arquivo da lista (caso o input permita múltiplos arquivos).

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); //lerConteudoDoArquivo: Função previamente definida (como no exemplo anterior) que retorna uma Promise. 
            // Ela lê o conteúdo do arquivo e o converte para uma URL codificada em base64.
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();            //usamos event.preventDefault() para evitar o comportamento padrão de atualização da tela ao pressionar "Enter",
        // garantindo que não perderemos o que foi digitado no formulário.
        const tagTexto = inputTags.value.trim(); //Para capturar o texto da tag, criamos uma constante tagTexto que recebe o valor do campo de entrada inputTags.value.trim(). 
        //O método trim() remove espaços em branco antes e depois do texto.
        if (tagTexto !== "") {
            const tagNova = document.createElement("li"); //Prosseguindo, verificamos se há algo digitado em tagTexto com a condição if (tagTexto !== "").
            // Se houver, criamos um novo item de lista para a tag com const tagNova = document.createElement("li").
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = "";
        }
    }
})