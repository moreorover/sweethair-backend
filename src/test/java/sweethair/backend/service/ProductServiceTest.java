package sweethair.backend.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import sweethair.backend.controller.NewProductDto;
import sweethair.backend.entity.Product;
import sweethair.backend.repository.ProductRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@DataJpaTest
@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    private AutoCloseable closeable;
    private ProductService productService;

    @Mock
    ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this); //without this you will get NPE
        productService = new ProductService(productRepository);
    }

    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }

    @Test
    void getProducts() {
        List<Product> products = this.productRepository.findAll();
        List<Product> products2 = this.productService.fetchAll();

        assertTrue(products.isEmpty());
        assertTrue(products2.isEmpty());
    }

    @Test
    void saveProduct() {
        NewProductDto product1 = new NewProductDto("Product 1");
        NewProductDto product2 = new NewProductDto("Product 2");


        Product p1 = this.productService.save(product1);
        Product p2 = this.productService.save(product2);

        assertFalse(this.productService.fetchAll().isEmpty());
        assertEquals(2, this.productService.fetchAll().size());
    }

//    @Test
//    void getProductsById() {
//        Long id = 1L;
//        List<Post> userPostsRepo = postRepository.findPostByUser(username);
//        List<Post> userPostsService = postService.getPostsByUser(username);
//        assertEquals(userPostsRepo, userPostsService);
//    }
}
