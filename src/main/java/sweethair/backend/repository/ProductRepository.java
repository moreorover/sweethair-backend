package sweethair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sweethair.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
