import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Livro } from './livro.model'; //importação da classe Produto
import { LivrosService } from './livros.service';

@Controller('livros') //decorator @Controller sinaliza para o nest que a classe é um controller, o parâmetro recebido é a rota pela qual deve responder
export class LivrosController {
  constructor(private livrosService: LivrosService) {}

  @Get() //lista os produtos
  async obterTodos(): Promise<Livro[]> {
    return this.livrosService.obterTodos();
  }

  @Get(':id') //lista um produto específico
  async obteerUm(@Param() params): Promise<Livro> {
    return this.livrosService.obterUm(params.id);
  }

  @Post() //o metodo post cria um item
  async criar(@Body() livro: Livro) {
    this.livrosService.criar(livro);
  }

  @Put() //o metodo put altera um item já existente
  async alterar(@Body() livro: Livro): Promise<[number, Livro[]]> {
    return this.livrosService.alterar(livro);
  }

  @Delete(':id') //apaga um produto
  async apagar(@Param() params) {
    this.livrosService.apagar(params.id);
  }
}
