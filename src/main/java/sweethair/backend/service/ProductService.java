package sweethair.backend.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sweethair.backend.entity.Product;
import sweethair.backend.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    public List<Product> fetchAll(){
        return this.productRepository.findAll();
    }

    public Product fetchById(long id) {
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElse(null);
    }

//    public Product save(NewProductDto newProductDto){
//        Product product = new Product();
//        product.setTitle(newProductDto.title());
//        return this.productRepository.save(product);
//    }
}
