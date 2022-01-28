import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Livro } from "./livro.model";

@Injectable()//transforma uma classe em provedor
export class LivrosService {
    constructor(
        @InjectModel(Livro)
        private livroModel: typeof Livro
        ) {
        
    }


    async obterTodos(): Promise <Livro[]> {//retornar o array de produtos.
        return this.livroModel.findAll();
    }

    async obterUm(id: number): Promise <Livro> {//retornar um produto específico.
        return this.livroModel.findByPk(id);
    }

    async criar(livro: Livro){//criar produto.
        this.livroModel.create(livro);
    }

    async alterar(livro: Livro): Promise <[number, Livro[]]> {//alterar um produto.
        return this.livroModel.update(livro, {
            where: {
                id: livro.id
            }
        });
    }

    async apagar(id: number){//apagar um produto.
        const livro: Livro = await this.obterUm(id)
        livro.destroy();
    }
}