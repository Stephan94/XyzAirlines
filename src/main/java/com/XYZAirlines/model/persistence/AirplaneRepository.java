package com.XYZAirlines.model.persistence;

import com.XYZAirlines.model.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Long> {

    Optional<Iterable<Airplane>> findByName(String name);
    Optional<Iterable<Airplane>> findByAirport(String airport);
    Optional<Airplane> findByFuel(int fuel);
}
