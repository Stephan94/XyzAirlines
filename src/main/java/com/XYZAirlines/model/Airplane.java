package com.XYZAirlines.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "Airplanes")
public class Airplane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private int fuel;
    private String airport;

    public Airplane(){

    }

    public Airplane(long id, String name, int fuel, String airport){

        this.id = id;
        this.name = name;
        this.fuel = fuel;
        this.airport = airport;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getFuel() {
        return fuel;
    }

    public void setFuel(int fuel) {
        if(fuel < 0 || fuel > 500000){
            throw new IllegalArgumentException("Fuel must be between 0 and 500000");
        }else{
            this.fuel = fuel;
        }
    }

    public String getAirport() {
        return airport;
    }

    public void setAirport(String airport) {
        airport = airport;
    }
}
