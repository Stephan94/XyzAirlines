package com.XYZAirlines.rest;

import com.XYZAirlines.model.*;
import com.XYZAirlines.model.persistence.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/airplanes")
public class AirplaneController {

        @Autowired
        private AirplaneRepository airplaneRepository;

        @GetMapping
        public ResponseEntity<Iterable<Airplane>> list() {
            return new ResponseEntity<Iterable<Airplane>>(this.airplaneRepository.findAll(), HttpStatus.OK);
        }

        @PostMapping
        public ResponseEntity<Airplane> create(@RequestBody Airplane newAirplane) {

            this.airplaneRepository.save(newAirplane);
            return new ResponseEntity<Airplane>(newAirplane, HttpStatus.CREATED);
        }

        @GetMapping("{id}")
        public ResponseEntity<Airplane> findById(@PathVariable long id) {

            Optional<Airplane> result = (this.airplaneRepository.findById(id));

            if (result.isPresent()) {
                return new ResponseEntity<Airplane>(result.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("{id}")
        public ResponseEntity<Airplane> updateById(@PathVariable long id, @RequestBody Airplane update) {

            Optional<Airplane> possibleUpdate = (this.airplaneRepository.findById(id));

            if (possibleUpdate.isPresent()) {
                Airplane updateId = possibleUpdate.get();

                updateId.setAirport(update.getAirport());
                updateId.setFuel(update.getFuel());
                updateId.setName(update.getName());

                return new ResponseEntity<Airplane>(this.airplaneRepository.save(updateId), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("{id}")
        public ResponseEntity<Airplane> deleteById(@PathVariable long id) {

            Optional<Airplane> result = (this.airplaneRepository.findById(id));

            if (result.isPresent()) {
                this.airplaneRepository.deleteById(id);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
