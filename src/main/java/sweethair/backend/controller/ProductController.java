package sweethair.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sweethair.backend.entity.Product;
import sweethair.backend.repository.ProductRepository;
import sweethair.backend.service.ProductService;

import java.net.URI;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(path="/api/v1/products", produces = "application/json")
@CrossOrigin(origins = "http:localhost:8080")
public class ProductController {

    private ProductService productService;
    private ProductRepository productRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Product> productById(@PathVariable("id") Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return new ResponseEntity<>(optionalProduct.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("")
    public Iterable<Product> recentTacos() {
        PageRequest page = PageRequest.of(
                0, 12, Sort.by("createDate").descending());
        return productRepository.findAll(page).getContent();
    }

    @PostMapping(consumes="application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Product save(@RequestBody NewProductDto newProductDto){
        return this.productService.save(newProductDto);
    }

    @PutMapping(path="/{id}", consumes="application/json")
    public Product update(
            @PathVariable("id") Long id,
            @RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("#{hasRole('ADMIN')}")
    public void deleteOrder(@PathVariable("id") Long id) {
        try {
            productRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {}
    }
}
