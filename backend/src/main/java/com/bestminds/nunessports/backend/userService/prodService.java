package com.bestminds.nunessports.backend.userService;

import com.bestminds.nunessports.backend.model.produtoEntity;
import com.bestminds.nunessports.backend.model.produtoRequestDTO;
import com.bestminds.nunessports.backend.model.produtoResponseDTO;
import com.bestminds.nunessports.backend.model.produtosRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class prodService {

    produtosRepository prodRepository;

    @Autowired
    public prodService(produtosRepository produtosRepository) {
        this.prodRepository = produtosRepository;
    }

    public List<produtoResponseDTO> getAllUsers() {
        List<produtoResponseDTO> prodList = this.prodRepository.findAll().stream().map(produtoResponseDTO::new).toList();
        return prodList;
    }

    public produtoEntity getProdByID(Integer codigo) {
        produtoEntity produto = (produtoEntity)this.prodRepository.findById(codigo).orElse((produtoEntity) null);
        return produto;
    }

    public void newProd(produtoRequestDTO data) {
        produtoEntity prodData = new produtoEntity(data);
        this.prodRepository.save(prodData);
    }

    public void alterProd(Integer codigo, produtoRequestDTO data) {
        produtoEntity oldProd = this.getProdByID(codigo);
        produtoEntity newProd = new produtoEntity();
        newProd.setCodigo(codigo);
        if (!data.nome().isEmpty()) {
            newProd.setNome(data.nome());
        } else {
            newProd.setNome(oldProd.getNome());
        }

        if (!data.descricao().isEmpty()) {
            newProd.setDescricao(data.descricao());
        } else {
            newProd.setDescricao(oldProd.getDescricao());
        }

        if (!data.preco().isNaN()) {
            newProd.setPreco(data.preco());
        } else {
            newProd.setPreco(oldProd.getPreco());
        }

        this.prodRepository.save(newProd);
    }

    public void deleteProd(Integer codigo) {
        this.prodRepository.deleteById(codigo);
    }
}
