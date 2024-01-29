
package com.bestminds.nunessports.backend.controller;

import com.bestminds.nunessports.backend.model.produtoEntity;
import com.bestminds.nunessports.backend.model.produtoRequestDTO;
import com.bestminds.nunessports.backend.model.produtoResponseDTO;
import com.bestminds.nunessports.backend.userService.prodService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutosController {
    prodService prodService;

    public ProdutosController() {
    }

    @Autowired
    public void prodController(prodService prodService) {
        this.prodService = prodService;
    }

    @CrossOrigin
    @GetMapping({"produtos"})
    public List<produtoResponseDTO> getAll() {
        return this.prodService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping({"produto"})
    public produtoEntity getProdByID(@RequestParam Integer codigo) {
        return this.prodService.getProdByID(codigo);
    }

    @CrossOrigin
    @PostMapping({"novo-produto"})
    public void newProd(@RequestBody produtoRequestDTO data) {
        this.prodService.newProd(data);
    }

    @CrossOrigin
    @PutMapping({"altera-produto"})
    public void alterProd(@RequestParam Integer codigo, @RequestBody produtoRequestDTO data) {
        this.prodService.alterProd(codigo, data);
    }

    @CrossOrigin
    @DeleteMapping({"deleta-produto"})
    public void deleteProd(@RequestParam Integer codigo) {
        this.prodService.deleteProd(codigo);
    }
}
