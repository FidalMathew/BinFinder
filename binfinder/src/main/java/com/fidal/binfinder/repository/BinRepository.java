package com.fidal.binfinder.repository;

import com.fidal.binfinder.entity.Bin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;



public interface BinRepository extends JpaRepository<Bin, Long> {



    @Query(value = """
        SELECT * FROM bins b
        WHERE (6371000 * ACOS(
                  COS(RADIANS(:latitude)) *
                  COS(RADIANS(b.latitude)) *
                  COS(RADIANS(b.longitude) - RADIANS(:longitude)) +
                  SIN(RADIANS(:latitude)) *
                  SIN(RADIANS(b.latitude))
              )) < :radius
        ORDER BY (6371000 * ACOS(
                  COS(RADIANS(:latitude)) *
                  COS(RADIANS(b.latitude)) *
                  COS(RADIANS(b.longitude) - RADIANS(:longitude)) +
                  SIN(RADIANS(:latitude)) *
                  SIN(RADIANS(b.latitude))
              ))
        """, nativeQuery = true)
    List<Bin> findNearbyBins(@Param("latitude") Double latitude,
                             @Param("longitude") Double longitude,
                             @Param("radius") Double radius);
}
