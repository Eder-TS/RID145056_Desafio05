import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
})

  async function createLivro(e){
    // Evitando da página recarregar para mostrar os alert's com segurança.
    e.preventDefault();

        const body = {
        title: livro.titulo,
        pages: Number(livro.num_paginas),
        isbn: livro.isbn,
        publisher: livro.editora
      }

      if(livro.titulo!=undefined && livro.titulo!='' && livro.num_paginas!=undefined && livro.num_paginas!='' && livro.isbn !=undefined && livro.isbn !='' && livro.editora !=undefined && livro.editora !=''){
      await LivrosService.createLivro(body)
      .then((response)=>{
        const title = response.data.title
        alert(`Livro ${title} criado com sucesso!`)
        setLivro({
          titulo: '',
          num_paginas: '',
          isbn: '',
          editora: ''
        })
      })
      .catch((error)=>{
        let message = 'Erro inesperado.'

        if (error.response) {
          message = JSON.stringify(error.response.data.message)
        } else if (error.request) {
          message = 'Sem resposta do servidor.'
        }
        
        alert(`${message}`)
        setLivro({
          titulo: '',
          num_paginas: '',
          isbn: '',
          editora: ''
        });
      });
    }
  }

  return (
  <>
    <Header/>    
    
    <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>          
          <form id="formulario">
          
          <div className='form-group'>
            <label>Titulo</label>
            <input type="text" id='titulo' value={livro.titulo} required onChange={(event)=>{ setLivro({...livro, titulo: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input type="text" id='num' value={livro.num_paginas} required onChange={(event)=>{ setLivro({...livro, num_paginas: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input type="text" id='isbn' value={livro.isbn} required onChange={(event)=>{ setLivro({...livro, isbn: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input type="text" id='editora' value={livro.editora} required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}}></input>
          </div> 
          <div className='form-group'>
            <button type='button' onClick={createLivro}>Cadastrar Livro</button>  
          </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro